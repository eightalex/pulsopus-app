import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import api from "@/api";
import { IAutocompleteOption } from '@/components/Autocomplete';
import { generateAutocompleteOption } from "@/helpers/generateAutocompleteOption.ts";
import { IRootStore, IUser, IUsersStore, IUserTrendRate } from '@/interfaces';
import { DateTime } from "@/utils";
import { BaseStore } from './BaseStore';

export class UsersStore extends BaseStore implements IUsersStore {
  public usersMap: Map<IUser['id'], IUser> = new Map();

  private asyncStatuses = {
    getUsers: this.createKey('getUsers'),
    getUser: this.createKey('getUser'),
    deleteUser: this.createKey('deleteUser'),
  };

  constructor(rootStore: IRootStore) {
    super(rootStore);
    makeObservable(this, {
      usersMap: observable,
      //
      users: computed,
      usersAutocompleteOptions: computed,
      // loading
      isLoadingUsers: computed,
      isLoadingUser: computed,
      isLoadingDeleteUser: computed,
      // actions
      getUsers: action.bound,
      getUser: action.bound,
      requestUsers: action.bound,
      requestUser: action.bound,
      calcUserTrendRateData: action.bound,
      updateUser: action.bound,
      deleteUsers: action.bound,
      setUserRoleById: action.bound,
      setUserActiveStatusById: action.bound,
      approveAccessRequest: action.bound,
      rejectAccessRequest: action.bound,
    });
  }

  public get isLoadingUsers() {
    return this.getAsyncStatus(this.asyncStatuses.getUsers).loading;
  }

  public get isLoadingUser() {
    return this.getAsyncStatus(this.asyncStatuses.getUser).loading;
  }

  public get isLoadingDeleteUser() {
    return this.getAsyncStatus(this.asyncStatuses.deleteUser).loading;
  }

  private setUser(user: IUser) {
    const prevUser = this.usersMap.has(user.id)
      ? this.usersMap.get(user.id)
      : {};
    runInAction(() => {
      this.usersMap.set(user.id, { ...prevUser, ...user });
    });
  }

  public async requestUsers(): Promise<IUser[]> {
    const users = await api.usersService.getAll();
    this.usersMap = new Map<IUser["id"], IUser>();
    runInAction(() => {
      for (const user of users) {
        this.setUser(user);
      }
    });
    return users;
  }

  public async requestUser(id: IUser['id']): Promise<IUser | undefined> {
    const key = this.asyncStatuses.getUser;
    this.setLoading(key);
    try {
      const user = await api.usersService.getById(id);
      console.log('user', user);
      runInAction(() => {
        this.setUser(user);
        this.setSuccess(key);
      });
      return user;
    } catch (err) {
      console.error(err);
      this.setError(key);
    }
  }

  public async getUsers(): Promise<void> {
    const key = this.asyncStatuses.getUsers;
    this.setLoading(key);
    try {
      await this.requestUsers();
      runInAction(() => {
        this.setSuccess(key);
      });
    } catch (err) {
      console.error(err);
      this.setError(key);
    }
  }

  public async getUser(userId: IUser['id']): Promise<IUser | undefined> {
    const key = this.asyncStatuses.getUser;
    this.setLoading(key);
    try {
      let user: IUser | undefined = undefined;
      if (this.usersMap.has(userId)) {
        user = this.usersMap.get(userId);
      } else {
        user = await this.requestUser(userId);
      }
      runInAction(() => {
        Boolean(user) && this.setUser(user as IUser);
        this.setSuccess(key);
      });
      return user;
    } catch (err) {
      console.error(err);
      this.setError(key);
    }
  }

  public get users(): IUser[] {
    return [...this.usersMap.values()];
  }

  public get usersAutocompleteOptions(): IAutocompleteOption<IUser>[] {
    return generateAutocompleteOption([...this.users], {
      type: 'user',
      keys: {
        value: 'id',
        label: 'username',
        department: 'department',
      }
    });
  }

  public calcUserTrendRateData(id: IUser['id'], from: number, to: number): IUserTrendRate {
    const defaultResult = {
      trend: 0,
      rate: 0,
      activity: [],
      currentCompanyActivity: 0,
      prevCompanyActivity: 0,
      currentUserActivity: 0,
      prevUserActivity: 0,
    };

    if (!from || !to) return defaultResult;
    const user = this.usersMap.get(id);
    if (!user) return defaultResult;

    const [prevFrom, prevTo] = DateTime.getPrevPeriod(from, to);

    const currentCompanyActivity = this.rootStore.departmentsStore.getCompanyActivity(from, to);
    const prevCompanyActivity = this.rootStore.departmentsStore.getCompanyActivity(prevFrom, prevTo);

    const currentActivities = [];
    const prevActivities = [];

    let currentActivityValue = 0;
    let prevActivityValue = 0;

    const currDateTime = DateTime.of(from, to);
    const prevDateTime = DateTime.of(prevFrom, prevTo);

    for (const activity of (user.activity || [])) {
      const { date, value } = activity;
      const d = Number(date);
      const v = Number(value);
      if(!d) continue;

      if (currDateTime.isBetweenOrEquals(d)) {
        currentActivities.push(activity);
        currentActivityValue += v;
      }
      if (prevDateTime.isBetweenOrEquals(d)) {
        prevActivities.push(activity);
        prevActivityValue += v;
      }
    }

    const rate = !(currentCompanyActivity && currentActivityValue)
      ? 0
      : (currentActivityValue / currentCompanyActivity) * 100;

    const cA = Math.max(Number(currentActivityValue), 1);
    const pA = Math.max(Number(prevActivityValue), 1);
    const diffAbsolute = cA / pA;

    const trend = cA >= pA
      ? (diffAbsolute - 1) * 100
      : (1 - diffAbsolute) * -100;

    return {
      ...defaultResult,
      activity: currentActivities,
      trend,
      rate,
      currentCompanyActivity: currentCompanyActivity,
      prevCompanyActivity: prevCompanyActivity,
      currentUserActivity: currentActivityValue,
      prevUserActivity: prevActivityValue,
    };
  }

  public async updateUser(userId: IUser["id"], partial: Partial<IUser>): Promise<IUser | null> {
    try {
      const user = await api.usersService.updateById(userId, partial);
      this.setUser(user);
      return user;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public async setUserRoleById(id: IUser["id"], role: IUser["role"]) {
    await this.updateUser(id, { role });
  }

  public async setUserActiveStatusById(id: IUser["id"], isActive: IUser["isActive"]) {
    await this.updateUser(id, { isActive });
  }

  public async deleteUsers(ids: IUser["id"][] = []) {
    if (!ids || !ids.length) return;
    const key = this.asyncStatuses.deleteUser;
    this.setLoading(key);
    try {
      await api.usersService.deleteUsers(ids);
      for (const id of ids) {
        this.usersMap.delete(id);
      }
      await this.rootStore.departmentsStore.getDepartments();
      this.setSuccess(key);
    } catch (err) {
      console.error(err);
      this.setError(key);
    }
  }

  public async approveAccessRequest(userId: IUser['id']): Promise<void> {
    try {
      await api.usersService.approveAccessRequest(userId);
      await this.getUser(userId);
    } catch (error) {
      console.error(error);
    }
  }

  public async rejectAccessRequest(userId: IUser['id']): Promise<void> {
    try {
      await api.usersService.rejectAccessRequest(userId);
      await this.getUser(userId);
    } catch (error) {
      console.error(error);
    }
  }
}
