import { IAutocompleteOption } from '@/components/Autocomplete';
import { IActivity } from "@/interfaces/IActivity.ts";
import { IDepartment } from '@/interfaces/IDepartment';

export interface IComputedDepartmentActivity {
	currentDepartmentActivity: number;
	prevDepartmentActivity: number;
	currentCompanyActivity: number;
	prevCompanyActivity: number;
	rate: number;
	trend: number;
	activities: IActivity[],
}

export interface IDepartmentsStore {
	departmentsMap: Map<IDepartment['id'], IDepartment>;

	departments: IDepartment[];
	departmentAutocompleteOptions: IAutocompleteOption[];

	isLoadingDepartments: boolean;

	getDepartments(): void;
	findDepartment(value?: string): IDepartment | null;

	getCompanyActivity(): number;
	getCompanyActivity(from: number, to: number): number;

	getActivityByDepartmentValue(value: string, from: number, to: number): number;
	getActivitiesByDepartmentValue(value: string, from: number, to: number): IActivity[];

	getDepartmentActivityDataByValue(value: string, from: number, to?: number): IComputedDepartmentActivity;
}
