import { AxiosInstance } from 'axios';
import { IDepartment } from "@/interfaces/IDepartment.ts";

export class DepartmentsService {
	constructor(private readonly restInstance: AxiosInstance) {}

	public async getAll(): Promise<IDepartment[]> {
		return this.restInstance
			.get('/departments')
			.then(({ data }) => data.departments);
	}
}
