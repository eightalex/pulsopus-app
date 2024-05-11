import { createSlice } from '@reduxjs/toolkit';
import sessionManager from '@/api/SessionManager.ts';
import { EUserRole } from "@/constants/EUser.ts";
import { IAuthStore } from "@/interfaces/IAuthStore.ts";
import { onAuthorize } from "@/stores/auth/operations.ts";

const initialState: IAuthStore = {
    user: null,
    // roles: [],
    // roles: [EUserRole.ADMIN],
    roles: [EUserRole.USER, EUserRole.ADMIN],
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
                sessionManager.setToken(payload.accessToken);
            })
            .addCase(onAuthorize.rejected, (state) => {
                state.isLoading = false;
                state.isAuthorized = false;
            });
            // .addCase(onLogin.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(onLogin.fulfilled, (state, { payload }) => {
            //     state.token = payload.accessToken;
            //     state.isAuthorized = true;
            //     state.isLoading = false;
            //     // state.secret = payload.secret;
            //     // state.userId = payload.user_id;
            //     // session_manager.setToken(payload.token);
            //     // session_manager.setPublicStr(payload.secret);
            // })
            // .addCase(onLogin.rejected, (state) => {
            //     state.isLoading = false;
            // });
    },
});

const { reducer, actions } = authSlice;

export { actions,reducer };
export default reducer;