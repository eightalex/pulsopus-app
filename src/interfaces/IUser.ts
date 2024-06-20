import { EUserRole, EUserStatus } from "@/constants/EUser.ts";
import { IEntity } from "@/interfaces";
import { IDepartment } from '@/interfaces/IDepartment';
import { IActivity } from "./IActivity.ts";

export interface IUserPosition {
	label: string;
	value: string;
}

export interface IUserDepartment extends Pick<IDepartment, 'value' | 'label'> {}

export interface IUserBase extends IEntity {
	username: string;
	email: string;
	avatar?: string;
	role: EUserRole;
}

export interface IUser extends IUserBase {
	activity?: IActivity[];
	department?: IUserDepartment;
	position?: IUserPosition;
	status: EUserStatus;
	isPending?: boolean;
	isAdmin?: boolean;
}