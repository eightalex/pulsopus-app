import { IAutocompleteOption } from '@/components/Autocomplete';
import { IDepartment } from '@/interfaces/IDepartment';

export interface IDepartmentsStore {
	departmentsMap: Map<IDepartment['id'], IDepartment>;

	departments: IDepartment[];
	departmentAutocompleteOptions: IAutocompleteOption[];

	isLoadingDepartments: boolean;

	getDepartments: () => void;
	findDepartment: (value?: string) => IDepartment | null;
}