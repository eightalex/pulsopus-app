import { AxiosInstance } from 'axios';
import sessionManager from '@/api/SessionManager.ts';
import { CLIENT_URL } from "@/config";
import { IAuthAuthorize } from "@/interfaces/IAuthStore.ts";

export class AuthService {
	constructor(private readonly restInstance: AxiosInstance) {}

	public async onRedirectClient(): Promise<void> {
		const { pathname, search } = window.location;
		const location = `${pathname}${search}`;
		const redirectPath = `${CLIENT_URL}/login?redirect=${location}`;
		window.location.replace(redirectPath);
	}

	public async onToken(): Promise<IAuthAuthorize> {
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
