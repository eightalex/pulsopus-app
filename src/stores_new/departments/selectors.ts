import { IDepartmentsStore } from "@/interfaces/IDepartmentsStore.ts";
import { IRootState } from "@/interfaces/IRootStore.ts";

export const selectDepartmentsState = (state: IRootState): IDepartmentsStore => state.departments;
export const selectDepartmentsLoadingAll = (state: IRootState): IDepartmentsStore["isLoadingDepartments"] => selectDepartmentsState(state).isLoadingDepartments;
export const selectDepartments = (state: IRootState): IDepartmentsStore["departments"] => selectDepartmentsState(state).departments;