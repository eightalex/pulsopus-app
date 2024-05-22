import { IActivity } from "@/interfaces/IActivity.ts";
import { IUser } from "@/interfaces/IUser.ts";

export interface IDepartment {
	id: string;
	name: string;
	label: string;
	activity: IActivity[];
	users: IUser[];
}
