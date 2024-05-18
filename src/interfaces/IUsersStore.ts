import { IAutocompleteOption } from '@/components/Autocomplete';
import { IDepartment } from '@/interfaces/IDepartment';
import { IUser } from '@/interfaces/IUser';

export interface IUsersStore {
	usersMap: Map<IUser['id'], IUser>;

	users: IUser[];
	usersAutocompleteOptions: IAutocompleteOption[];

	isLoadingUsers: boolean;
	isLoadingUser: boolean;

	getUsers: () => void;
	getUser: (id: IUser['id']) => Promise<IUser>;
	getUsersByDepartmentId: (departmentId: IDepartment['id']) => IUser[];
}
