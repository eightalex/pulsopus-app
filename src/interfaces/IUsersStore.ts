import { IAutocompleteOption } from '@/components/Autocomplete';
import { EUserStatusPendingResolve } from "@/constants/EUser.ts";
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
	usersAutocompleteOptions: IAutocompleteOption[];

	isLoadingUsers: boolean;
	isLoadingUser: boolean;
	isLoadingDeleteUser: boolean;

	requestUsers: () => Promise<IUser[]>;
	getUsers: () => void;
	getUser: (id: IUser['id']) => Promise<IUser | undefined>;

	calcUserTrendRateData: (id: IUser["id"], from: number, to: number) => IUserTrendRate;

	setUserRoleById: (id: IUser["id"], role: IUser["role"]) => Promise<void>;

	setUserAccessRequestDecision: (id: IUser["id"], requestId: IUser["accessRequestId"], resolve: EUserStatusPendingResolve) => Promise<void>;
	deleteUsers: (ids: IUser["id"][]) => Promise<void>;
}