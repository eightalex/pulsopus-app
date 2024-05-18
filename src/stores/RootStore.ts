import {
	IAuthStore,
	IDepartmentsStore,
	INotifyStore,
	IPeopleDynamicStore,
	IUserDiagramStore,
	IUsersStore
} from '@/interfaces';
import { IRootStore } from '@/interfaces/IRootStore';
import { AuthStore } from '@/stores/AuthStore';
import { DepartmentsStore } from '@/stores/DepartmentsStore';
import { NotifyStore } from '@/stores/NotifyStore';
import { PeopleDynamicStore } from '@/stores/PeopleDynamicStore';
import { RouteStore } from '@/stores/RouteStore';
import { UserDiagramStore } from '@/stores/UserDiagramStore';
import { UsersStore } from '@/stores/UsersStore';


export class RootStore implements IRootStore {
	public readonly routeStore: RouteStore;

	public readonly authStore: IAuthStore;
	public readonly notifyStore: INotifyStore;
	public readonly usersStore: IUsersStore;
	public readonly departmentsStore: IDepartmentsStore;
	public readonly userDiagramStore: IUserDiagramStore;
	public readonly peopleDynamicStore: IPeopleDynamicStore;

	constructor() {
		this.routeStore = new RouteStore(this);

		this.notifyStore = new NotifyStore(this);
		this.authStore = new AuthStore(this);
		this.usersStore = new UsersStore(this);
		this.departmentsStore = new DepartmentsStore(this);
		this.userDiagramStore = new UserDiagramStore(this);
		this.peopleDynamicStore = new PeopleDynamicStore(this);
	}

}
