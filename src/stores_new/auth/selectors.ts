import { IAuthStore } from "@/interfaces/IAuthStore.ts";
import { IRootStore } from "@/interfaces/IRootStore.ts";
import { IUser } from "@/interfaces/IUser";

export const selectAuthState = (state: IRootStore): IAuthStore => state.auth;
export const selectAuthIsAuthorized = (state: IRootStore): IAuthStore["isAuthorized"] => selectAuthState(state).isAuthorized;
export const selectAuthIsLoading = (state: IRootStore): IAuthStore["isLoadingAuth"] => selectAuthState(state).isLoadingAuth;
export const selectAuthUser = (state: IRootStore): IAuthStore["user"] => selectAuthState(state).user;
export const selectAuthRoles = (state: IRootStore): IUser["roles"] => selectAuthState(state).user?.roles || [];