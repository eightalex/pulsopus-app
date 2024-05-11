import { AxiosInstance } from 'axios';

export class AuthService {
	constructor(private readonly restInstance: AxiosInstance) {}

	public async onToken(): Promise<{ accessToken: string, refreshToken: string }> {
		return this.restInstance
				.post('/auth/token')
				.then(({ data }) => data);
	}


	public async onLogout(): Promise<void> {
		return this.restInstance
			.post('/auth/logout')
			.then(({ data }) => data);
	}
}
