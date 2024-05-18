import { IActivity } from "@/interfaces/IActivity.ts";

export interface IDepartment {
	id: string;
	name: string;
	label: string;
	activity: IActivity[];
}
