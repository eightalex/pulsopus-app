import { IActivity, IUser } from "@/interfaces";

export interface IDepartment {
	id: string;
	value: string;
	label: string;
	activity: IActivity[];
	users: IUser[];
}