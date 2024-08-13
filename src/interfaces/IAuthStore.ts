import { IUser } from '@/interfaces/IUser';

export interface IAuthAuthorize {
	user: IUser;
	accessToken: string;
	refreshToken: string;
}

export interface IAuthStore {
	user?: IUser;

	role: IUser['role']
	userId?: IUser["id"];
	isAdmin: boolean;

	isLoadingLogin: boolean;
	isLoadingLogout: boolean;
	isLoadingAuth: boolean;
	isLoadingRedirectLogin: boolean;

	isLoginError: boolean;

	isAuthorized: boolean;

	onAuthorize: (redirect?: string) => Promise<void>;
	onLogout: () => Promise<void>;
	onRedirectLogin: () => void;
}
