import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import api, { EUserSocketEvent, SocketService } from "@/api";
import { EUserStatus } from "@/constants/EUser.ts";
import { IAdministrationStore, IRootStore, IUser } from '@/interfaces';
import { BaseStore } from './BaseStore';

export class AdministrationStore extends BaseStore implements IAdministrationStore {
	private readonly socket: SocketService = new SocketService();
	public globalFilter: string = '';
	public usersToDelete: IUser[] = [];
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

	public setUsersToDelete(users: IUser[]): void {
		runInAction(() => {
			this.usersToDelete = [...new Set([...users])];
		});
	}

	private async createAndConnectSocketInstance() {
		try {
			const connectedLink = await api.usersService.getAdminConnectedLink();
			this.socket.setUri(connectedLink);
			const socket = await this.socket.connect();

			socket.on(EUserSocketEvent.DELETE, (message: { id: IUser["id"] }) => {
				this.rootStore.usersStore.usersMap.delete(message.id);
			});

			this.socket.on<{ id: IUser["id"] }>(EUserSocketEvent.DELETE, (message) => {
				this.rootStore.usersStore.usersMap.delete(message.id);
			});

			this.socket.on<{ id: IUser["id"] }>(EUserSocketEvent.UPDATE, (message) => {
				this.rootStore.usersStore.getUser(message.id);
			});

		} catch (err) {
			this.rootStore.notifyStore.error(`Socket connection error`);
		}
	}

	public async mount() {
		await this.rootStore.usersStore.requestUsers();
		await this.rootStore.departmentsStore.requestDepartments();
		await this.createAndConnectSocketInstance();
	}

	public unmount() {
		this.globalFilter = '';
		this.socket.destroy();
	}
}
