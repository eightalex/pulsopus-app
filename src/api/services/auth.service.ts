import { AxiosInstance } from 'axios';
import sessionManager from '@/api/SessionManager.ts';
import { CLIENT_URL } from "@/config";
import { QUERY_REDIRECT, ROUTE_DEFAULT } from "@/constants/routes.ts";
import { IAuthAuthorize } from "@/interfaces/IAuthStore.ts";

export class AuthService {
	constructor(private readonly restInstance: AxiosInstance) {}

	public async onRedirectClient(): Promise<void> {
		const { pathname, search } = window.location;
		let location = `${pathname}${search}`;
		if(location.length >= 1) {
			location = `/${ROUTE_DEFAULT}`;
		}
		const redirectPath = `${CLIENT_URL}/login?${QUERY_REDIRECT}=${location}`;
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
