import { FilterFn, SortingFn } from "@tanstack/react-table";

import { DEFAULT_BLANK_KEY } from "@/components/Table/TableSelect";
import { IUser } from "@/interfaces";

export const ROLES_SEPARATOR = '/';

export const calcMaxColSize = (size = 0, min = 190, max = 250) => {
    const spacing = 4;
    return Math.max(min, Math.min(size + spacing, max));
};

export const sortStatusFn: SortingFn<IUser> = (rowA, rowB, _columnId) => {
    const statusA = rowA.original.status;
    const statusB = rowB.original.status;
    const statusOrder = ['PENDING', 'INACTIVE', 'ACTIVE'];
    return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
};

export const filterStatusFn: FilterFn<IUser> = (row, columnId, filterValue): boolean => {
    return row.getValue(columnId) === filterValue;
};

export const filterDepartmentFn: FilterFn<IUser> = (row, columnId, filterValue): boolean => {
    return (row.getValue(columnId) || DEFAULT_BLANK_KEY) === filterValue;
};