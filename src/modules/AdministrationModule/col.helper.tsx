import { FilterFn, SortingFn } from "@tanstack/react-table";

import { IUser } from "@/interfaces";

export const ROLES_SEPARATOR = '/';

export const sortStatusFn: SortingFn<IUser> = (rowA, rowB, _columnId) => {
    const statusA = rowA.original.status;
    const statusB = rowB.original.status;
    const statusOrder = ['PENDING', 'INACTIVE', 'ACTIVE'];
    return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
};

export const filterStatusFn: FilterFn<IUser> = (row, columnId, filterValue): boolean => {
    return row.getValue(columnId) === filterValue;
};

export const filterRolesFn: FilterFn<IUser> = (row, columnId, filterValue): boolean => {
    const rV = row.getValue(columnId) as string[];
    const v = rV.join(ROLES_SEPARATOR);
    return v.includes(filterValue);
};