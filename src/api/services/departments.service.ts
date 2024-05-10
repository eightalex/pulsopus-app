import { IDepartment } from '@/interfaces';
import { AxiosInstance } from 'axios';
import db from '../../../db/MockDB';

export class DepartmentsService {

	constructor(private readonly restInstance: AxiosInstance) {}

	public async getDepartments(): Promise<IDepartment[]> {
		//TODO: remove mock
		return db.department.all();
		//TODO: implement server req
		return await this.restInstance
			.get<IDepartment[]>('/departments')
			.then(({ data }) => data as IDepartment[]);
	}
}
