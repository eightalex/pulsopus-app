import { AxiosInstance } from 'axios';
import { IUser } from "@/interfaces/IUser.ts";

export class UsersService {
	constructor(private readonly restInstance: AxiosInstance) {}

	public async getAll(): Promise<IUser[]> {
		return this.restInstance
			.get('/users')
			.then(({ data }) => data.users);
	}
}