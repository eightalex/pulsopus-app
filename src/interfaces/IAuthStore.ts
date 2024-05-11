import { EUserRole } from "@/constants/EUser.ts";
import { IUser } from "@/interfaces/IUser.ts";

export interface IAuthTokensData {
    accessToken: string;
    refreshToken: string;
}
export interface IAuthReturnData extends IAuthTokensData {
    userId?: string;
}

export interface IAuthStore {
    user: IUser | null;
    isAuthorized: boolean;
    isLoading: boolean;
    roles: EUserRole[];
}