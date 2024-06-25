import Stack from "@mui/material/Stack";
import { CellContext, ColumnDef, TableMeta } from '@tanstack/react-table';
import { observer } from "mobx-react";
import moment from "moment";
import React, { useMemo, useRef } from 'react';

import Table, { COLORS, ETableFilterVariant, TTable } from "@/components/Table";
import { TableSelect } from "@/components/Table/TableSelect/TableSelect.tsx";
import { EUserRole, EUserStatus } from "@/constants/EUser.ts";
import { useStores } from "@/hooks";
import { IUser } from "@/interfaces";

import { calcMaxColSize, filterDepartmentFn, filterStatusFn, sortStatusFn } from "./col.helper.tsx";
import {
    AdministrationTableHeadSelectAction
} from "./components/AdministrationTableHeadSelectAction.tsx";

export const AdministrationTable = observer(() => {
    const {
        rootStore: {
            usersStore: {
                users: data,
                setUserStatusById,
                setUserRoleById,
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

    console.log('tableRef.current', tableRef.current);

    const maxTitleSize = useMemo(() => {
        const maxTitleLength = data.reduce((acc, { username }) => {
            const unLength = username.length;
            return unLength > acc ? unLength : acc;
        }, 0);
        return calcMaxColSize(maxTitleLength, 190, 240);
    }, [data]);

    const columns = useMemo<ColumnDef<IUser>[]>(() => {
        return [
            {
                accessorKey: 'username',
                header: 'Title',
                cell: (info: CellContext<IUser, unknown>) => info.getValue(),
                size: maxTitleSize,
            },
            {
                accessorKey: 'department',
                header: 'Department',
                accessorFn: (row: IUser) => row.department?.label,
                cell: (info: CellContext<IUser, unknown>) => info.getValue(),
                size: 200,
                meta: {
                    filterVariant: ETableFilterVariant.SELECT,
                },
                filterFn: filterDepartmentFn,
            },
            {
                header: 'Date',
                accessorFn: (row: IUser) => row.createdAt,
                cell: (info: CellContext<IUser, unknown>) => moment(Number(info.getValue())).format('DD.MM.YYYY'),
                size: 140,
            },
            {
                accessorKey: 'role',
                header: 'Role',
                cell: (info: CellContext<IUser, unknown>) => {
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
                meta: {
                    filterVariant: ETableFilterVariant.SELECT,
                },
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: (info: CellContext<IUser, unknown>) => {
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
            {
                id: 'row-select-action',
                accessorKey: 'row-select-action',
                header: ({ table }: { table: Table<IUser> }) => <AdministrationTableHeadSelectAction table={table}/>,
                cell: (info) => info.getValue(),
                size: 86,
                enableSorting: false,
            },
        ];
    }, [maxTitleSize, isAdmin, usersRoles, currentUser?.id, setUserRoleById, usersStatuses, setUserStatusById]);

    return (
        <Stack
            direction='row'
            // maxWidth='1000px'
            maxWidth='1200px'
            width='100%'
            flexGrow={1}
            overflow='hidden'
        >
            <Table
                getTable={(t, d) => {
                    tableRef.current = t;
                    tableDataRef.current = d;
                }}
                globalFilter={''}
                data={data}
                columns={columns}
                numCol
                showPagination
                rowStyleOverrides={(row) => {
                    const uId = row.original.id;
                    // const isPending = data.find(u => u.id === uId)?.isPending;
                    const isPending = row.original.isPending;
                    const color = isPending ? COLORS.ACTIVE : 'unset';
                    return {
                        color,
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