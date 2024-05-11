import { createSlice } from '@reduxjs/toolkit';
import { EAuthStage } from "@/constants/EAuth.ts";
import { IAuthStore } from "@/interfaces/IAuthStore.ts";
import { onAuthorize, onLogin } from "@/stores/auth/operations.ts";

const initialState: IAuthStore = {
    token: undefined,
    isAuthorized: false,
    isLoading: false,
    stage: EAuthStage.SIGN_STAGE,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // setItems: (state, action: PayloadAction<ISidebarState["items"]>) => {
        //     // const payload = action?.payload || [];
        //     // const history = [...Array.from(state.itemsHistory), payload].reduce((acc, items) => {
        //     //     if (!items.length) return acc;
        //     //     return [...acc, items];
        //     // }, []);
        //     // state.itemsHistory = history;
        //     state.items = action?.payload || [];
        //
        //     return state;
        // },
        // setShowPopup: (state, action: PayloadAction<ISidebarState["showPopup"]>) => {
        //     state.showPopup = action.payload;
        //     return state;
        // },
    },
    extraReducers: builder => {
        builder
            .addCase(onAuthorize.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(onAuthorize.fulfilled, (state, { payload }) => {
                state.token = payload.accessToken;
                state.isAuthorized = true;
                state.isLoading = false;
                // state.secret = payload.secret;
                // state.userId = payload.user_id;
                // session_manager.setToken(payload.token);
                // session_manager.setPublicStr(payload.secret);
            })
            .addCase(onAuthorize.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(onLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(onLogin.fulfilled, (state, { payload }) => {
                state.token = payload.accessToken;
                state.isAuthorized = true;
                state.isLoading = false;
                // state.secret = payload.secret;
                // state.userId = payload.user_id;
                // session_manager.setToken(payload.token);
                // session_manager.setPublicStr(payload.secret);
            })
            .addCase(onLogin.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

const { reducer, actions } = authSlice;

export { actions,reducer };
export default reducer;