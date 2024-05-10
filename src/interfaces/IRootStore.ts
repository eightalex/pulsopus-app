import {
	IAPIRequester,
	IAuthStore,
	IDepartmentsStore,
	INotifyStore,
	IPeopleDynamicStore,
	IUserDiagramStore,
	IUsersStore
} from '@/interfaces';
import { RouteStore } from '@/stores/RouteStore';
import { ModalsStore } from "@/stores/ModalsStore.ts";

export interface IRootStore {
	requester: IAPIRequester;
	routeStore: RouteStore;
	modalsStore: ModalsStore;

	authStore: IAuthStore;
	notifyStore: INotifyStore;
	usersStore: IUsersStore;
	departmentsStore: IDepartmentsStore;
	userDiagramStore: IUserDiagramStore;
	peopleDynamicStore: IPeopleDynamicStore;
}
