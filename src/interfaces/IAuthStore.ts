import { IUser } from "@/interfaces/IUser.ts";

export interface IAuthTokensData {
    accessToken: string;
    refreshToken: string;
}
export interface IAuthReturnData extends IAuthTokensData {
    user: IUser;
}

export interface IAuthStore {
    user: IUser | null;
    isAuthorized: boolean;
    isLoading: boolean;
}