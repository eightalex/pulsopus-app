import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import api from "@/api";
import sessionManager from "@/api/SessionManager.ts";
import { CLIENT_URL } from "@/config";
import { IAuthStore, IRootStore, IUser } from '@/interfaces';
import { BaseStore } from '@/stores/BaseStore';

export class AuthStore extends BaseStore implements IAuthStore {
	public user?: IUser;
	private asyncStatuses = {
		login: this.createKey('login'),
		logout: this.createKey('logout'),
	};

	constructor(rootStore: IRootStore) {
		super(rootStore);
		makeObservable(this, {
			user: observable,

			roles: computed,

			isLoadingLogin: computed,
			isLoadingLogout: computed,
			isLoadingAuth: computed,
			isLoginError: computed,
			isAuthorized: computed,

			onAuthorize: action.bound,
			onLogout: action.bound,
		});
	}

	public get isLoadingLogin() {
		return this.getAsyncStatus(this.asyncStatuses.login).loading;
	}

	public get isLoadingLogout() {
		return this.getAsyncStatus(this.asyncStatuses.logout).loading;
	}

	public get isLoadingAuth() {
		return this.isLoadingLogin || this.isLoadingLogout;
	}

	public get isLoginError(): boolean {
		return this.getAsyncStatus(this.asyncStatuses.login).error;
	}

	public get isAuthorized(): boolean {
		return !!this.user;
	}

	public async onAuthorize() {
		if (this.isLoadingAuth) return;
		const key = this.asyncStatuses.login;
		this.setLoading(key);
		try {
			const data = await api.authService.onToken();
			if (!data) {
				throw new Error('Unexpected exception auth/authorize. No data');
			}
			runInAction(() => {
				this.user = data.user;
				this.setSuccess(key);
			});
		} catch (err) {
			this.user = undefined;
			console.error('[onAuthorize]: ', err);
			this.setError(key);
			sessionManager.removeTokens();
			api.authService.onRedirectClient();
		}
	}

	public async onLogout(): Promise<void> {
		const key = this.asyncStatuses.logout;
		this.setLoading(key);
		try {
			await api.authService.onLogout();
			runInAction(() => {
				this.user = undefined;
				this.setSuccess(key);
			});
		} catch (err) {
			console.error(err);
			this.setError(key);
		} finally {
			sessionManager.removeTokens();
			window.location.replace(CLIENT_URL);
		}
	}

	public get roles(): IUser["roles"] {
		return this.user?.roles || [];
	}
}
