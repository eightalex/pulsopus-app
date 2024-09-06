import { AxiosInstance } from 'axios';
import sessionManager from '@/api/SessionManager.ts';
import { CLIENT_URL } from "@/config";
import { QUERY_PARAM_LOGIN, QUERY_PARAM_TARGET } from "@/constants/routes.ts";
import { IAuthAuthorize } from "@/interfaces/IAuthStore.ts";

export const enum EUserSocketEvent {
	CONNECT = 'CONNECT',
	DISCONNECT = 'DISCONNECT',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE',
	INSERT = 'INSERT',
	MESSAGE = 'MESSAGE',
	ERROR = 'ERROR',
}

export class AuthService {
	constructor(private readonly restInstance: AxiosInstance) {}

	public async onRedirectClient(): Promise<void> {
		const { href, origin } = window.location;
		const target = href.replace(origin, '');
		const params = {
			[QUERY_PARAM_LOGIN]: 'true',
			[QUERY_PARAM_TARGET]: target,
		};

		const query = new URLSearchParams(params);
		for (const key of query.keys()) {
			if(params[key as keyof typeof params]) continue;
			query.delete(key);
		}

		const url = CLIENT_URL.concat(`?${query}`);
		window.location.replace(url);
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
