import { IUser } from '@/interfaces';
import { AxiosInstance } from 'axios';
import db from '../../../db/MockDB';

export class UsersService {

	constructor(private readonly restInstance: AxiosInstance) {}

	public async getUsers(): Promise<IUser[]> {
		//TODO: remove mock
		return await db.employees.get();
		//TODO: implement server req
		await this.restInstance
			.get<IUser[]>('/employees')
			.then(({ data }) => data as IUser[]);
	}

	public async getUser(id: IUser['id']): Promise<IUser> {
		return db.employees.getById(id);
	}
}
