import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import api from "@/api";
import sessionManager from "@/api/SessionManager.ts";
import { CLIENT_URL } from "@/config";
import { EUserRole } from "@/constants/EUser.ts";
import { IAuthStore, IRootStore, IUser } from '@/interfaces';
import { BaseStore } from '@/stores/BaseStore';

export class AuthStore extends BaseStore implements IAuthStore {
	public user?: IUser;
	private asyncStatuses = {
		login: this.createKey('login'),
		logout: this.createKey('logout'),
		redirectLogin: this.createKey('redirect_login'),
	};

	constructor(rootStore: IRootStore) {
		super(rootStore);
		makeObservable(this, {
			user: observable,

			role: computed,
			isAdmin: computed,
			userId: computed,

			isLoadingLogin: computed,
			isLoadingLogout: computed,
			isLoadingAuth: computed,
			isLoadingRedirectLogin: computed,
			isLoginError: computed,
			isAuthorized: computed,

			onAuthorize: action.bound,
			onLogout: action.bound,
			onRedirectLogin: action.bound,
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

	public get isLoadingRedirectLogin() {
		return this.getAsyncStatus(this.asyncStatuses.redirectLogin).loading;
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
			await api.authService.onRedirectClient();
		}
	}

	public async onLogout(): Promise<void> {
		const key = this.asyncStatuses.logout;
		this.setLoading(key);
		try {
			await api.authService.onLogout();
			sessionManager.removeTokens();
			runInAction(() => {
				this.user = undefined;
				this.setSuccess(key);
			});
		} catch (err) {
			console.error(err);
			this.setError(key);
		} finally {
			window.location.replace(CLIENT_URL);
		}
	}

	public async onRedirectLogin(): Promise<void> {
		const key = this.asyncStatuses.redirectLogin;
		this.setLoading(key);
		try {
			sessionManager.removeTokens();
			await api.authService.onRedirectClient();
			runInAction(() => {
				this.user = undefined;
				this.setSuccess(key);
			});
		} finally {
			this.resetAsyncStatus(key);
		}
	}

	public get role(): IUser["role"] {
		const r = this.user?.role;
		if(!r) {
			throw new Error('Unexpected exception. No user role');
		}
		return r;
	}

	public get userId() {
		return this.user?.id;
	}

	public get isAdmin():boolean {
		return this.user?.isAdmin || this.user?.role === EUserRole.ADMIN;
	}
}