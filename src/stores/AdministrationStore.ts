import { action, computed, makeObservable, observable } from 'mobx';
import { EUserStatus } from "@/constants/EUser.ts";
import { IAdministrationStore, IRootStore, IUser } from '@/interfaces';
import { BaseStore } from './BaseStore';

export class AdministrationStore extends BaseStore implements IAdministrationStore {
	public globalFilter: string = '';
	private cronInterval: ReturnType<typeof setInterval> | null = null;
	private readonly cronTimeout = 10000;
	constructor(rootStore: IRootStore) {
		super(rootStore);
		makeObservable(this, {
			globalFilter: observable,
			//
			users: computed,
			// actions
			setGlobalFilter: action.bound,
			//
			mountStore: action.bound,
			unmountStore: action.bound,
		});
	}

	public get users(): IUser[] {
		return this.rootStore.usersStore.users.sort((p, n) => {
			const statusOrders = [EUserStatus.PENDING];
			const prevStatusIndex = statusOrders.indexOf(p.status);
			const nextStatusIndex = statusOrders.indexOf(n.status);
			return nextStatusIndex - prevStatusIndex;
		});
	}

	public setGlobalFilter(value: string = ''): void {
		this.globalFilter = value;
	}

	private clearCronData() {
		if(!this.cronInterval) return;
		clearInterval(this.cronInterval);
	}

	private async createCronData() {
		this.clearCronData();
		await this.rootStore.usersStore.requestUsers();
		await this.rootStore.departmentsStore.requestDepartments();
		this.cronInterval = setInterval(async () => {
			await this.rootStore.usersStore.requestUsers();
			await this.rootStore.departmentsStore.requestDepartments();
		}, this.cronTimeout);
	}

	private resetStore() {
		this.clearCronData();
		this.globalFilter = '';
	}

	public async mountStore() {
		await this.createCronData();
	}

	public unmountStore() {
		this.resetStore();
	}
}
