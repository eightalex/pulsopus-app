import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api';
import { IUser } from "@/interfaces/IUser.ts";

export const getUsersAll = createAsyncThunk<IUser[], void>(
    'users/all',
    async (_, thunkApi) => {
        try {
            return await api.usersService.getAll();
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue('message');
        }
    }
);
