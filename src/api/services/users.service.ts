import { AxiosInstance } from 'axios';
import { EUserStatusPendingResolve } from "@/constants/EUser.ts";
import { IUser } from "@/interfaces/IUser.ts";

export class UsersService {
	constructor(private readonly restInstance: AxiosInstance) {}

	public async getAll(): Promise<IUser[]> {
		return this.restInstance
			.get('/users')
			.then(({ data }) => data.users);
	}

	public async getById(id: IUser["id"]): Promise<IUser> {
		return this.restInstance
			.get(`/users/${id}`)
			.then(({ data }) => data.users);
	}

	public async updateById(id: IUser["id"], body: Partial<IUser>): Promise<IUser> {
		return this.restInstance
			.put(`/users/${id}`, body)
			.then(({ data }) => data.user);
	}

	public async getUserStatuses(): Promise<{ value: string, canSetted: boolean }[]> {
		return this.restInstance
			.get('/users/statuses')
			.then(({ data }) => data.statuses);
	}

	public async getUserRoles(): Promise<{ value: string, canSetted: boolean }[]> {
		return this.restInstance
			.get('/users/roles')
			.then(({ data }) => data.roles);
	}

	public async setUserAccessRequest(
		id: IUser["id"],
		requestId: IUser["accessRequestId"],
		decision: EUserStatusPendingResolve
	): Promise<void> {
		return this.restInstance.post(`/users/${id}/access`, {
			requestId,
			decision
		});
	}

	public async deleteUsers(ids: IUser["id"][]): Promise<void> {
		const params = {
			// ids: encodeURIComponent(JSON.stringify(ids)),
			ids: ids.join(','),
		};
		const search = new URLSearchParams(params);
		const url = `/users?${search}`;
		return this.restInstance.delete(url);
	}
}
