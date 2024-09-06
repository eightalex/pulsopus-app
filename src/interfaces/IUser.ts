import { EUserRole, EUserStatus } from "@/constants/EUser.ts";
import { IEntity } from "@/interfaces";
import { IDepartment } from '@/interfaces/IDepartment';
import { IActivity } from "./IActivity.ts";

export interface IUserPosition {
	label: string;
	value: string;
}

export interface IUserDepartment extends Pick<IDepartment, 'value' | 'label'> {}

export interface IUserProfile extends IEntity {
	email: string;
	username: string;
	avatar?: string;
	role: EUserRole;
	department?: string;
	position?: string;
	isActive?: boolean;
	isPending?: boolean;
	isAdmin?: boolean;
}

export interface IUser extends IUserProfile {
	activity?: IActivity[];
	status: EUserStatus;
	accessRequestId?: string;
}