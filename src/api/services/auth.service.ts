import { AxiosInstance } from 'axios';
import sessionManager from '@/api/SessionManager.ts';
import { IAuthReturnData } from "@/interfaces/IAuthStore.ts";

export class AuthService {
	constructor(private readonly restInstance: AxiosInstance) {}

	public async onToken(): Promise<IAuthReturnData> {
		return this.restInstance
				.post('/auth/token')
				.then(({ data }) => data);
	}


	public async onLogout(token: string = sessionManager.token): Promise<void> {
		return this.restInstance
			.post(
				'/auth/logout',
				null,
				{
					headers: { Authorization: `Bearer ${token}` }
				})
			.then(({ data }) => data);
	}
}
