import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from "@/interfaces/IUser.ts";
import { IUsersStore } from "@/interfaces/IUsersStore.ts";
import { getUsersAll } from "@/stores_new/users/operations.ts";

const initialState: IUsersStore = {
    users: [],
    isLoadingUsers: false,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getUsersAll.pending, (state) => {
                state.isLoadingUsers = true;
            })
            .addCase(getUsersAll.fulfilled, (state, { payload }: PayloadAction<IUser[]>) => {
                state.users = payload;
                state.isLoadingUsers = false;
            })
            .addCase(getUsersAll.rejected, (state) => {
                state.isLoadingUsers = false;
            });
    },
});

const { reducer, actions } = usersSlice;

export { actions,reducer };
export default reducer;