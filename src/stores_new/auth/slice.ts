import { createSlice } from '@reduxjs/toolkit';
import sessionManager from '@/api/SessionManager.ts';
import { IAuthStore } from "@/interfaces/IAuthStore.ts";
import { onAuthorize } from "@/stores_new/auth/operations.ts";

const initialState: IAuthStore = {
    user: null,
    isAuthorized: false,
    isLoading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(onAuthorize.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(onAuthorize.fulfilled, (state, { payload }) => {
                state.isAuthorized = true;
                state.isLoading = false;
                state.user = payload.user;
                sessionManager.setToken(payload.accessToken);
            })
            .addCase(onAuthorize.rejected, (state) => {
                state.isLoading = false;
                state.isAuthorized = false;
            });
    },
});

const { reducer, actions } = authSlice;

export { actions,reducer };
export default reducer;