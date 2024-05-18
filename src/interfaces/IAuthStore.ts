import { IUser } from '@/interfaces/IUser';

export interface IAuthAuthorize {
	user: IUser;
	accessToken: string;
	refreshToken: string;
}

export interface IAuthStore {
	user?: IUser;
	roles: IUser['roles']

	isLoadingLogin: boolean;
	isLoadingLogout: boolean;
	isLoadingAuth: boolean;

	isLoginError: boolean;

	isAuthorized: boolean;

	onAuthorize: () => Promise<void>;
	onLogout: () => Promise<void>;
}
