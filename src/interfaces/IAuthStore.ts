import { IUserAuth } from '@/interfaces/IUser';
import { EAuthSignType, EAuthStage } from "@/constants/EAuth.ts";

export interface IAuthAuthorize {
	user: IUserAuth;
	accessToken: string;
	refreshToken: string;
}

export interface IAuthStore {
	stage: EAuthStage;
	user?: IUserAuth;
	isLoadingLogin: boolean;
	isLoadingLogout: boolean;
	isLoadingAuth: boolean;

	isLoginError: boolean;

	isAuthorized: boolean;

	onLogin: (email: string, password: string, redirect?: string) => Promise<void>;
	onSendAdmin: (email: string) => Promise<void>;
	onSign: (type: EAuthSignType) => Promise<void>;
	onAuthorize: () => Promise<void>;
	onLogout: () => Promise<void>;

	handleOpenAuth: () => void;
	handleOpenForgetPassword: () => void;

	resetAuthState: () => void;
}
