import Stack from "@mui/material/Stack";
import { ColumnDef, TableMeta } from '@tanstack/react-table';
import { observer } from "mobx-react";
import React, { HTMLProps, useMemo, useRef } from 'react';

import Table, { COLORS, ETableColumnType, ETableFilterVariant, ROW_SELECT_COL_KEY, TTable } from "@/components/Table";
import { TableSelect } from "@/components/Table/TableSelect/TableSelect.tsx";
import { EUserRole, EUserStatus } from "@/constants/EUser.ts";
import { useStores } from "@/hooks";
import { IUser } from "@/interfaces";

import { filterRolesFn, filterStatusFn, sortStatusFn } from "./col.helper.tsx";

function IndeterminateCheckbox({
                                   indeterminate,
                                   className = '',
                                   ...rest
                               }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null!);

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    );
}

export const AdministrationTable = observer(() => {
    const {
        rootStore: {
            usersStore: {
                users: data,
                setUserStatusById,
                usersStatuses,
                usersRoles,
            },
            authStore: {
                isAdmin,
                user: currentUser,
            },
        }
    } = useStores();
    const tableRef = useRef<TTable<IUser>>();
    const tableDataRef = useRef<IUser[]>();


    const columns = useMemo<ColumnDef<IUser>[]>(() => {
        const base = [
            {
                accessorKey: 'username',
                header: 'Title',
                cell: info => info.getValue(),
                size: 230,
            },
            {
                accessorKey: 'department',
                header: 'Department',
                accessorFn: (row) => row.department.label,
                cell: info => info.getValue(),
                size: 180,
                meta: {
                    filterVariant: ETableFilterVariant.SELECT,
                },
            },
            {
                header: 'Date',
                cell: () => '25.07.2023',
                size: 140,
            },
            {
                accessorKey: 'role',
                header: 'Role',
                cell: info => {
                    const { getValue, table: infoTable, row, column } = info;
                    const initialValue = getValue() as string;
                    const opts = usersRoles.reduce((acc, s) => {
                        if(!s.canSetted) return acc;
                        return [...acc, s.value];
                    }, [] as string[]);

                    const meta = (infoTable.options.meta) as TableMeta<IUser>;
                    const rowUserId = row.original.id;

                    const loading = meta.getLoading(row.index, column.id);

                    const onChange = async (newValue?: string) => {
                        if(!newValue) return;

                        meta.setLoading(row.index, column.id);
                        meta.updateData(row.index, column.id, newValue);
                        try {
                            await setUserRoleById(rowUserId, EUserRole[newValue as keyof typeof EUserRole]);
                        } finally {
                            meta.setLoading(row.index, column.id, false);
                        }
                    };


                    return (
                        <TableSelect
                            loading={loading}
                            disabled={currentUser?.id === rowUserId || !isAdmin}
                            value={initialValue}
                            onChange={(v) => onChange(v as string)}
                            options={opts}
                        />
                    );
                },
                filterFn: filterRolesFn,
                meta: {
                    filterVariant: ETableFilterVariant.SELECT,
                },
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: (info) => {
                    const { getValue, table: infoTable, row, column } = info;
                    const initialValue = getValue() as string;
                    const opts = usersStatuses.reduce((acc, s) => {
                        if(!s.canSetted) return acc;
                        return [...acc, s.value];
                    }, [] as string[]);

                    const meta = (infoTable.options.meta) as TableMeta<IUser>;
                    const rowUserId = row.original.id;

                    const loading = meta.getLoading(row.index, column.id);

                    const onChange = async (newValue?: string) => {
                        if(!newValue) return;

                        meta.setLoading(row.index, column.id);
                        meta.updateData(row.index, column.id, newValue);
                        try {
                            await setUserStatusById(rowUserId, EUserStatus[newValue as keyof typeof EUserStatus]);
                        } finally {
                            meta.setLoading(row.index, column.id, false);
                        }
                    };

                    return (
                        <TableSelect
                            loading={loading}
                            disabled={currentUser?.id === rowUserId || !isAdmin}
                            value={initialValue}
                            onChange={(v) => onChange(v as string)}
                            options={opts}
                        />
                    );
                },
                meta: {
                    filterVariant: ETableFilterVariant.SELECT,
                },
                filterFn: filterStatusFn,
                sortingFn: sortStatusFn,
            },
        ];
        if(isAdmin) {
            base.push( {
                accessorKey: ROW_SELECT_COL_KEY,
                meta: {
                    type: ETableColumnType.ROW_SELECT
                }
            });
        }
        return base;
    }, [isAdmin, currentUser, setUserStatusById]);

    return (
        <Stack
            direction='row'
            maxWidth='1000px'
            width='100%'
            flexGrow={1}
            overflow='hidden'
        >
            <Table
                getTable={(t, d) => {
                    tableRef.current = t;
                    tableDataRef.current = d;
                }}
                data={[...data, ...data, ...data]}
                columns={columns}
                numCol
                showPagination
                rowStyleOverrides={(row) => {
                    return {
                        color: row.original?.isPending ? COLORS.ACTIVE : 'unset',
                    };
                }}
                // initialState={{
                //     sorting: [
                //         {
                //             id: 'status',
                //             desc: false,
                //         }
                //     ]
                // }}
            />
        </Stack>
    );
});