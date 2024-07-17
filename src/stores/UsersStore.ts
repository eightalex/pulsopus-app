import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import api from "@/api";
import { IAutocompleteOption } from '@/components/Autocomplete';
import { EUserStatusPendingResolve } from "@/constants/EUser.ts";
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
			requestUsers: action.bound,
			getUsers: action.bound,
			getUser: action.bound,
			calcUserTrendRateData: action.bound,
			setUserRoleById: action.bound,
			setUserAccessRequestDecision: action.bound,
			deleteUsers: action.bound,
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
		runInAction(() => {
			this.usersMap.set(user.id, user);
		});
	}

	public async requestUsers(): Promise<IUser[]> {
		const users =  await api.usersService.getAll();
		this.usersMap = new Map<IUser["id"], IUser>();
		runInAction(() => {
			for (const user of users) {
				this.setUser(user);
			}
		});
		return users;
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
			const user = this.usersMap.get(userId) || await api.usersService.getById(userId);
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

	public get users(): IUser[] {
		return [...this.usersMap.values()];
	}

	public get usersAutocompleteOptions(): IAutocompleteOption[] {
		return generateAutocompleteOption([...this.users], {
			type: 'user',
			keys: {
				value: 'id',
				label: 'username',
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
		if(!from || !to) return defaultResult;
		const user = this.usersMap.get(id);
		if(!user) return defaultResult;
		const [prevFrom, prevTo] = DateTime.getPrevPeriod(from, to);
		const currentCompanyActivity = this.rootStore.departmentsStore.getCompanyActivity(from, to);
		const prevCompanyActivity = this.rootStore.departmentsStore.getCompanyActivity(prevFrom, prevTo);
		const currentActivities = [];
		let currentActivitiesSum = 0;
		const prevActivities = [];
		let prevActivitiesSum = 0;
		const currDateTime = DateTime.of(from, to);
		const prevDateTime = DateTime.of(prevFrom, prevTo);
		for (const activity of (user.activity || [])) {
			const { date } = activity;
			if(!Number(date)) continue;
			if(currDateTime.isBetweenOrEquals(Number(date))) {
				currentActivities.push(activity);
				currentActivitiesSum += activity.value;
			}
			if(prevDateTime.isBetweenOrEquals(Number(date))) {
				prevActivities.push(activity);
				prevActivitiesSum += activity.value;
			}
		}
		const cA = Math.max(Number(currentActivitiesSum), 1);
		const pA = Math.max(Number(prevActivitiesSum), 1);
		const diffAbsolute = cA / pA;
		const trend = cA >= pA
			? (diffAbsolute - 1) * 100
			: (1 - diffAbsolute) * -100;

		const rate =  !(currentCompanyActivity && currentActivitiesSum)
			? 0
			: (currentActivitiesSum / currentCompanyActivity) * 100;
		return {
			...defaultResult,
			activity: currentActivities,
			trend,
			rate,
			currentCompanyActivity: currentCompanyActivity,
			prevCompanyActivity: prevCompanyActivity,
			currentUserActivity: currentActivitiesSum,
			prevUserActivity: prevActivitiesSum,
		};
	}

	public async setUserRoleById(id: IUser["id"], role: IUser["role"]) {
		try {
			const user = await api.usersService.updateById(id, { role });
			this.setUser(user);
		} catch (err) {
			console.error(err);
		}
	}

	public async setUserAccessRequestDecision(id: IUser["id"], requestId: IUser["accessRequestId"], resolve: EUserStatusPendingResolve): Promise<void> {
		try {
			await api.usersService.setUserAccessRequest(
				id,
				requestId,
				resolve
			);
			this.usersMap.delete(id);
			await this.getUser(id);
		} catch (err) {
			console.error(err);
		}
	}

	public async deleteUsers(ids: IUser["id"][] = []) {
		if(!ids || !ids.length) return;
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
}
