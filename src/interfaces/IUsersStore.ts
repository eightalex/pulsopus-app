import { IAutocompleteOption } from '@/components/Autocomplete';
import { IDepartment } from '@/interfaces/IDepartment';
import { IUser } from '@/interfaces/IUser';

export interface IUsersStore {
	usersMap: Map<IUser['id'], IUser>;
	usersStatuses: { value: string, canSetted: boolean }[];
	usersRoles: { value: string, canSetted: boolean }[];

	users: IUser[];
	usersAutocompleteOptions: IAutocompleteOption[];

	isLoadingUsers: boolean;
	isLoadingUser: boolean;

	getUsers: () => void;
	getUser: (id: IUser['id']) => Promise<IUser>;
	getUsersByDepartmentId: (departmentId: IDepartment['id']) => IUser[];

	setUserStatusById: (id: IUser["id"], status: IUser["status"]) => Promise<void>;
	setUserRoleById: (id: IUser["id"], role: IUser["role"]) => Promise<void>;
}
