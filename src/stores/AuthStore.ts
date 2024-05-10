import { APP_ROUTE, APP_ROUTE_DEFAULT, EMPTY_USER_ROUTE } from '@/constants/routes';
import { IAuthStore, IRootStore, IUserAuth } from '@/interfaces';
import { BaseStore } from '@/stores/BaseStore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { EAuthSignType, EAuthStage } from "@/constants/EAuth.ts";

const DEFAULT_AUTH_STAGE = EAuthStage.SIGN_STAGE;

export class AuthStore extends BaseStore implements IAuthStore {
	public stage: EAuthStage = DEFAULT_AUTH_STAGE;
	public user?: IUserAuth;
	private asyncStatuses = {
		login: this.createKey('login'),
		logout: this.createKey('logout'),
	};
	private email: string = '';
	private password: string = '';

	constructor(rootStore: IRootStore) {
		super(rootStore);
		makeObservable(this, {
			stage: observable,
			user: observable,

			isLoadingLogin: computed,
			isLoadingLogout: computed,
			isLoadingAuth: computed,
			isLoginError: computed,
			isAuthorized: computed,

			onLogin: action.bound,
			onLogout: action.bound,
			onAuthorize: action.bound,
			onSendAdmin: action.bound,

			handleOpenAuth: action.bound,
			handleOpenForgetPassword: action.bound,

			resetAuthState: action.bound,
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

	public async onLogin(email: string, password: string, redirect: string = APP_ROUTE): Promise<void> {
		if (this.isLoadingAuth) return;
		const key = this.asyncStatuses.login;
		this.setLoading(key);
		try {
			const { user } = await this.rootStore.requester.authService.login(email, password);
			runInAction(() => {
				this.user = user;
				this.setSuccess(key);
			});
			this.rootStore.modalsStore.userAuth.onClose();
			this.rootStore.routeStore.navigate(redirect);
		} catch (err) {
			console.error(err);
			this.rootStore.notifyStore.error(err?.data?.message || err.message);
			this.setError(key, err);
			runInAction(() => {
				this.email = email;
				this.password = password;
				this.stage = EAuthStage.UNAUTHORIZED_STAGE;
			});
		}
	}

	public async onSendAdmin(emailAdmin: string): Promise<void> {
		if (this.isLoadingAuth) return;
		const key = this.asyncStatuses.login;
		this.setLoading(key);
		try {
			await this.rootStore.requester.authService.sendAdmin({
				emailAdmin, emailUser: this.email, password: this.password
			});
			runInAction(() => {
				this.stage = EAuthStage.UNAUTHORIZED_SENT_STAGE;
				this.setSuccess(key);
			});
		} catch (err) {
			console.error(err);
			this.rootStore.notifyStore.error(err?.data?.message || err.message);
			this.setError(key, err);
		}
	}

	public async onSign(type: EAuthSignType) {
		if(!type) {
			throw new Error('Unexpected exception. Type cannot be empty ');
		}
		alert(`Sign width ${type} no implemented!`);
	}

	public async onAuthorize() {
		if (this.isLoadingAuth) return;
		const key = this.asyncStatuses.login;
		this.setLoading(key);
		try {
			const data = await this.rootStore.requester.authService.getMe();
			runInAction(() => {
				this.user = data.user;
				this.setSuccess(key);
			});
		} catch (err) {
			console.error(err);
			this.setError(key, err);
			// TODO: uncomment after implementation login
			// this.rootStore.notifyStore.error(err.message);
		}
	}

	public async onLogout(): Promise<void> {
		const key = this.asyncStatuses.logout;
		this.setLoading(key);
		try {
			await this.rootStore.requester.authService.logout();
			this.rootStore.routeStore.navigate(EMPTY_USER_ROUTE);
			runInAction(() => {
				this.user = null;
				this.setSuccess(key);
			});
		} catch (err) {
			console.error(err);
			this.setError(key, err);
		}
	}

	public handleOpenAuth() {
		if(this.isAuthorized) {
			this.rootStore.routeStore.navigate(APP_ROUTE_DEFAULT);
			return;
		}
		this.rootStore.modalsStore.userAuth.onOpen();
	}
	public handleOpenForgetPassword() {
		runInAction(() => {
			this.stage = EAuthStage.FORGOT_PASSWORD_STAGE;
		});
	}

	public resetAuthState() {
		runInAction(() => {
			this.stage = DEFAULT_AUTH_STAGE;
			this.email = '';
			this.password = '';
		});
	}
}
