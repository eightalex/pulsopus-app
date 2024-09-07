import { IAutocompleteOption } from '@/components/Autocomplete';
import { IActivity } from "@/interfaces/IActivity.ts";
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

	users: IUser[];
	usersAutocompleteOptions: IAutocompleteOption<IUser>[];

	isLoadingUsers: boolean;
	isLoadingUser: boolean;
	isLoadingDeleteUser: boolean;

	requestUsers: () => Promise<IUser[]>;
	getUsers: () => void;
	requestUser: (id: IUser['id']) => Promise<IUser | undefined>;
	getUser: (id: IUser['id']) => Promise<IUser | undefined>;

	calcUserTrendRateData: (id: IUser["id"], from: number, to: number) => IUserTrendRate;

	setUserRoleById: (id: IUser["id"], role: IUser["role"]) => Promise<void>;
	setUserActiveStatusById: (id: IUser["id"], isActive: IUser["isActive"]) => Promise<void>;

	deleteUsers: (ids: IUser["id"][]) => Promise<void>;

	approveAccessRequest: (userId: IUser['id']) => Promise<void>;
	rejectAccessRequest: (userId: IUser['id']) => Promise<void>;

	updateUser: (userId: IUser["id"], partial: Partial<IUser>) => Promise<IUser | null>
}