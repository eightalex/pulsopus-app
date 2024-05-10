export interface IDepartmentActivity {
	date: number;
	rate: number;
	min: number;
	max: number;
}

export interface IDepartment {
	id: number;
	label: string;
	value: string;
	activity: IDepartmentActivity[];
}
