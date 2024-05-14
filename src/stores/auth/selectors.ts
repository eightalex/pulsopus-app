import { IAuthStore } from "@/interfaces/IAuthStore.ts";
import { IRootState } from "@/interfaces/IRootStore.ts";

export const selectAuthState = (state: IRootState): IAuthStore => state.auth;
export const selectAuthIsAuthorized = (state: IRootState): IAuthStore["isAuthorized"] => selectAuthState(state).isAuthorized;
export const selectAuthIsLoading = (state: IRootState): IAuthStore["isLoading"] => selectAuthState(state).isLoading;
export const selectAuthUser = (state: IRootState): IAuthStore["user"] => selectAuthState(state).user;
export const selectAuthRoles = (state: IRootState): IAuthStore["roles"] => selectAuthState(state).roles;