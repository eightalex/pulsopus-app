import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api';
import sessionManager from "@/api/SessionManager.ts";
import { CLIENT_URL } from "@/config";
import { IAuthReturnData } from "@/interfaces/IAuthStore.ts";

export const onAuthorize = createAsyncThunk<IAuthReturnData, void>(
    'auth/authorize',
    async (_, thunkApi) => {
        try {
            const data = await api.authService.onToken();
            if (!data) {
                throw new Error('Unexpected exception auth/authorize. No data');
            }
            return data;
        } catch (error) {
            console.error('[onAuthorize]: ', error);
            sessionManager.removeTokens();
            const { pathname, search } = window.location;
            const location = `${pathname}${search}`;
            const redirectPath = `${CLIENT_URL}/login?redirect=${location}`;
            window.location.replace(redirectPath);
            return thunkApi.rejectWithValue('message');
        }
    }
);

export const onLogout = createAsyncThunk(
    'auth/logout',
    async (_, thunkApi) => {
        alert('onLogout');
        try {
            await api.authService.onLogout();
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue('message');
        } finally {
            sessionManager.removeTokens();
            window.location.replace(CLIENT_URL);
        }
    }
);
