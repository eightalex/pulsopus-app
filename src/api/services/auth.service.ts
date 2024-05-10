import { LocalService } from '@/api/services';
import { IAuthAuthorize } from '@/interfaces';
import { AxiosInstance } from 'axios';
import db from '../../../db/MockDB';

export class AuthService {
	private readonly local = new LocalService();

	constructor(private readonly restInstance: AxiosInstance) {}

	public async getTokens(): Promise<{ accessToken: string, refreshToken: string }> {
		return {
			accessToken: this.local.getAccessToken(),
			refreshToken: this.local.getRefreshToken(),
		};
	}

	public async setTokens({ accessToken, refreshToken }: IAuthAuthorize) {
		this.local.setAccessToken(accessToken);
		this.local.setRefreshToken(refreshToken);
	}

	public async clearTokens() {
		this.local.setAccessToken('');
		this.local.setRefreshToken('');
	}

	public async getMe(): Promise<IAuthAuthorize> {
		//TODO: remove mock
		const { accessToken } = await this.getTokens();
		if(!accessToken) {
			throw new Error('Unauthorized');
		}
		const mockData = await db.auth.current();
		await this.setTokens(mockData);
		return mockData;
		//TODO: implement server req ...
		const data = await this.restInstance
			.get<IAuthAuthorize>('/auth/current')
			.then(({ data }) => data as IAuthAuthorize);
		await this.setTokens(data);
		return data;
	}

	public async login(email: string, password: string): Promise<IAuthAuthorize> {
		//TODO: remove mock
		const mockData = await db.auth.login(email, password);
		await this.setTokens(mockData);
		return mockData;
		//TODO: implement server req ...
		const data = await this.restInstance
			.post<IAuthAuthorize>('/auth/login', { username: email, password })
			.then(({ data }) => data as IAuthAuthorize);
		await this.setTokens(data);
		return data;
	}

	public async sendAdmin(params: {
		emailAdmin: string
		emailUser: string,
		password: string,
	}): Promise<void> {
		//TODO: remove mock
		const { emailAdmin, emailUser, password } = params;
		return db.auth.sendAdmin(emailAdmin, emailUser, password);
		//TODO: implement server req ...
	}

	public async logout(): Promise<void> {
		//TODO: remove mock
		await this.clearTokens();
		await db.auth.logout();
		return;
		//TODO: implement server req ...
		await this.restInstance.get('/auth/logout');
	}

	public async refresh() {
		//TODO: remove mock
		const mockData = await db.auth.refresh();
		await this.setTokens(mockData);
		return mockData;
		//TODO: implement server req ...
		const { refreshToken } = await this.getTokens();
		const data = await this.restInstance
			.get<IAuthAuthorize>('/auth/refresh', {
				headers: {
					'Authorization': `Bearer ${refreshToken}`,
				}
			})
			.then(({ data }) => data as IAuthAuthorize);
		await this.setTokens(data);
		return data;
	}
}
