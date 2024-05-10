export class LocalService {
	private readonly accessTokenKey = 'ACCESS_TOKEN';
	private readonly refreshTokenKey = 'REFRESH_TOKEN';
	/**
	 * @deprecated: remove mock users key
	 * */
	private readonly localUsersKey = 'LOCAL_USERS';

	public setAccessToken(token: string) {
		this.setItem(this.accessTokenKey, token);
	}

	public setRefreshToken(token: string) {
		this.setItem(this.refreshTokenKey, token);
	}

	public getAccessToken(): string  {
		return this.getItem<string>(this.accessTokenKey) || '';
	}

	public getRefreshToken(): string {
		return this.getItem<string>(this.refreshTokenKey) || '';
	}

	/**
	 * @deprecated: remove mock users data actions
	 * */
	public setLocalUsers(users: [string, string][]) {
		this.setItem(this.localUsersKey, [... new Map(users)]);
	}

	/**
	 * @deprecated: remove mock users data actions
	 * */
	public getLocalUsers(): [string, string][] {
		const us =  this.getItem<[string, string][]>(this.localUsersKey) || [];
		return [...new Map([
			['admin@pulsopus.com', 'admin'],
			...us,
		])] as [string, string][];
	}

	private setItem(key: string, data: unknown) {
		localStorage.setItem(key, JSON.stringify(data));
	}

	private getItem<T>(key: string): T | null {
		const data = localStorage.getItem(key);
		if(!data) {
			return null;
		}
		return JSON.parse(data) as T;
	}
}
