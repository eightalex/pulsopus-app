import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import api, { SocketService } from "@/api";
import { EUserStatus } from "@/constants/EUser.ts";
import { IAdministrationStore, IRootStore, IUser } from '@/interfaces';
import { BaseStore } from './BaseStore';

export class AdministrationStore extends BaseStore implements IAdministrationStore {
	private readonly socket: SocketService = new SocketService();
	public globalFilter: string = '';
	public usersToDelete: IUser[] = [];
	private cronInterval: ReturnType<typeof setInterval> | null = null;
	private readonly cronTimeout = 10000;
	constructor(rootStore: IRootStore) {
		super(rootStore);
		makeObservable(this, {
			globalFilter: observable,
			usersToDelete: observable,
			//
			users: computed,
			// actions
			setGlobalFilter: action.bound,
			setUsersToDelete: action.bound,
			//
			mount: action.bound,
			unmount: action.bound,
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

	public setUsersToDelete(users: IUser[]): void {
		runInAction(() => {
			this.usersToDelete = [...new Set([...users])];
		});
	}

	private async socketConnect() {
		debugger;
		const connectedLink = await api.usersService.getAdminConnectedLink();
		this.socket.setUri(connectedLink);
		this.socket.connect();
		console.log('this.socket.connected', this.socket.connected);
		return;

		console.log('this.socket.connected', this.socket.connected);

		// this.socket.on('DELETE', (data) => {
		// 	console.log('data', data);
		// 	alert(JSON.stringify(data, null, 4));
		// });
	}

	private resetStore() {
		this.clearCronData();
		this.globalFilter = '';
		this.socket.destroy();
	}

	public async mount() {
		await this.socketConnect();
		await this.rootStore.usersStore.requestUsers();
		await this.rootStore.departmentsStore.requestDepartments();
		// await this.createCronData();
	}

	public unmount() {
		this.resetStore();
	}
}
