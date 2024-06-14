import { EUserRole, EUserStatus } from "@/constants/EUser.ts";
import { IActivity } from "@/interfacces/IActivity.ts";
import { IEntity } from "@/interfaces";
import { IDepartment } from '@/interfaces/IDepartment';

export interface IUserAuth {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	avatar?: string;
	role: string;
}

// export interface IUserActivity {
// 	date: number;
// 	rate: number;
// }

// export interface IUser extends Omit<IUserAuth, 'username' | 'role'> {
// 	email: string;
// 	department: IDepartment;
// 	activity: IUserActivity[];
// 	index: '+' | '-' | '=';
// 	date: number;
// 	role: string[];
// }

export interface IUserBase extends IEntity {
	username: string;
	email: string;
	avatar?: string;
}

export interface IUser extends IUserBase{
	role: EUserRole;
	activity: IActivity[];
	status: EUserStatus,
	department: Pick<IDepartment, 'id' | 'value' | 'label'>
	isPending?: boolean;
	isAdmin?: boolean;
}