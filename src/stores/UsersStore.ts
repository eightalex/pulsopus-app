import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import api from "@/api";
import { IAutocompleteOption } from '@/components/Autocomplete';
import { generateAutocompleteOption } from "@/helpers/generateAutocompleteOption.ts";
import { IDepartment, IRootStore, IUser, IUsersStore } from '@/interfaces';
import { BaseStore } from './BaseStore';

export class UsersStore extends BaseStore implements IUsersStore {
	public usersMap: Map<IUser['id'], IUser> = new Map();

	private asyncStatuses = {
		getUsers: this.createKey('getUsers'),
		getUser: this.createKey('getUser'),
	};

	constructor(rootStore: IRootStore) {
		super(rootStore);
		makeObservable(this, {
			usersMap: observable,
			users: computed,
			usersAutocompleteOptions: computed,
			// loading
			isLoadingUsers: computed,
			isLoadingUser: computed,
			// actions
			getUsers: action.bound,
			getUser: action.bound,
			getUsersByDepartmentId: action.bound,
		});
	}

	public get isLoadingUsers() {
		return this.getAsyncStatus(this.asyncStatuses.getUsers).loading;
	}

	public get isLoadingUser() {
		return this.getAsyncStatus(this.asyncStatuses.getUser).loading;
	}

	private setUser(user: IUser) {
		runInAction(() => {
			this.usersMap.set(user.id, user);
		});
	}

	public async getUsers(): Promise<void> {
		const key = this.asyncStatuses.getUsers;
		this.setLoading(key);
		try {
			const users =  await api.usersService.getAll();
			runInAction(() => {
				for (const user of users) {
					this.setUser(user);
				}
				this.setSuccess(key);
			});
		} catch (err) {
			console.error(err);
			this.setError(key);
		}
	}

	public async getUser(id: IUser['id']): Promise<IUser> {
		const key = this.asyncStatuses.getUser;
		this.setLoading(key);
		try {
			const user: IUser = this.usersMap.get(id) || await this.rootStore.requester.usersService.getUser(id);
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

	public getUsersByDepartmentId(departmentId: IDepartment['id']): IUser[] {
		if(departmentId === 0) {
			return this.users;
		}
		return this.users.filter(({ department }) => department.id === departmentId);
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
}
