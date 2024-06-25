import { IAutocompleteOption } from '@/components/Autocomplete';
import { IActivity } from "@/interfaces/IActivity.ts";
import { IDepartment } from '@/interfaces/IDepartment';
import { IUser } from '@/interfaces/IUser';

export interface IUserTrendRate {
	currentCompanyActivity: number;
	prevCompanyActivity: number;
	currentUserActivity: number;
	prevUserActivity: number;
	trend: number;
	rate: number;
	activity: IActivity[];
}

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

	calcUserTrendRateData: (id: IUser["id"], from: number, to: number) => IUserTrendRate;

	setUserStatusById: (id: IUser["id"], status: IUser["status"]) => Promise<void>;
	setUserRoleById: (id: IUser["id"], role: IUser["role"]) => Promise<void>;
}
