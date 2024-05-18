import { IRootState } from "@/interfaces/IRootStore.ts";
import { IUsersStore } from "@/interfaces/IUsersStore.ts";

export const selectUsersState = (state: IRootState): IUsersStore => state.users;
export const selectUsers = (state: IRootState): IUsersStore["users"] => selectUsersState(state).users;
export const selectUsersLoadingAll = (state: IRootState): IUsersStore["isLoadingUsers"] => selectUsersState(state).isLoadingUsers;