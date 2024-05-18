import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api';
import { IDepartment } from "@/interfaces/IDepartment.ts";

export const getDepartments = createAsyncThunk<IDepartment[], void>(
    'departments/all',
    async (_, thunkApi) => {
        try {
            return await api.departmentsService.getAll();
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue('message');
        }
    }
);
