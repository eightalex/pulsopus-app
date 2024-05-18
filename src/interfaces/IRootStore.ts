import {
	IAuthStore,
	IDepartmentsStore,
	INotifyStore,
	IPeopleDynamicStore,
	IUserDiagramStore,
	IUsersStore
} from '@/interfaces';
import { RouteStore } from '@/stores/RouteStore';

export interface IRootStore {
	routeStore: RouteStore;

	authStore: IAuthStore;
	notifyStore: INotifyStore;
	usersStore: IUsersStore;
	departmentsStore: IDepartmentsStore;
	userDiagramStore: IUserDiagramStore;
	peopleDynamicStore: IPeopleDynamicStore;
}
