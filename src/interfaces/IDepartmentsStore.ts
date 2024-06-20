import { IAutocompleteOption } from '@/components/Autocomplete';
import { IActivity } from "@/interfaces/IActivity.ts";
import { IDepartment } from '@/interfaces/IDepartment';

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
}
