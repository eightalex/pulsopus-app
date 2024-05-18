import { createSlice } from '@reduxjs/toolkit';
import { IDepartmentsStore } from "@/interfaces/IDepartmentsStore.ts";
import { getDepartments } from "@/stores_new/departments/operations.ts";

const initialState: IDepartmentsStore = {
    departments: [],
    isLoadingDepartments: false,
};

export const departmentsSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getDepartments.pending, (state) => {
                state.isLoadingDepartments = true;
            })
            .addCase(getDepartments.fulfilled, (state, { payload }) => {
                state.departments = payload;
                state.isLoadingDepartments = false;
            })
            .addCase(getDepartments.rejected, (state) => {
                state.isLoadingDepartments = false;
            });
    },
});

const { reducer, actions } = departmentsSlice;

export { actions,reducer };
export default reducer;