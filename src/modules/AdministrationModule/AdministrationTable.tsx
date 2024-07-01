import Stack from "@mui/material/Stack";
import { CellContext, ColumnDef, TableMeta } from '@tanstack/react-table';
import { observer } from "mobx-react";
import moment from "moment";
import { useMemo, useRef, useState } from 'react';

import Table, { COLORS, ETableFilterVariant, TTable } from "@/components/Table";
import { TableSelect } from "@/components/Table/TableSelect/TableSelect.tsx";
import { EUserRole, EUserStatus, EUserStatusPendingResolve } from "@/constants/EUser.ts";
import { useStores } from "@/hooks";
import { IUser } from "@/interfaces";

import { calcMaxColSize, filterDepartmentFn, filterStatusFn, sortStatusFn } from "./col.helper.tsx";
import { AdministrationTableSelectAction } from "./components/AdministrationTableSelectAction";
import { ConfirmDeleteDialog } from "./components/ConfirmDialog";

export const AdministrationTable = observer(() => {
    const {
        rootStore: {
            usersStore: {
                setUserAccessRequestDecision,
                setUserRoleById,
            },
            authStore: {
                user: currentUser,
            },
            administrationStore: {
                users: data,
                globalFilter,
            }
        }
    } = useStores();
    const tableRef = useRef<TTable<IUser>>();
    const tableDataRef = useRef<IUser[]>();
    const [usersToDelete, setUsersToDelete] = useState<IUser[]>([]);

    const maxTitleSize = useMemo(() => {
        const maxTitleLength = data.reduce((acc, { username }) => {
            const unLength = username.length;
            return unLength > acc ? unLength : acc;
        }, 0);
        return calcMaxColSize(maxTitleLength, 190, 240, 10);
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
                size: 168,
                meta: {
                    filterVariant: ETableFilterVariant.SELECT,
                },
                filterFn: filterDepartmentFn,
            },
            {
                header: 'Date',
                accessorFn: (row: IUser) => row.createdAt,
                cell: (info: CellContext<IUser, unknown>) => moment(Number(info.getValue())).format('DD.MM.YYYY'),
                size: 100,
            },
            {
                accessorKey: 'role',
                header: 'Role',
                cell: (info: CellContext<IUser, unknown>) => {
                    const { getValue, table: infoTable, row, column } = info;
                    const user = row.original;
                    const isAdmin = user.isAdmin;
                    const initialValue = getValue() as string;
                    const opts = Object.values(EUserRole);

                    const meta = (infoTable.options.meta) as TableMeta<IUser>;
                    const rowUserId = user.id;

                    const loading = meta.getLoading(row.index, column.id);
                    const disabled = Boolean(currentUser?.id === rowUserId || !currentUser?.isAdmin || isAdmin);
                    const onChange = async (newValue?: string) => {
                        if (!newValue) return;
                        try {
                            meta.setLoading(row.index, column.id);
                            await setUserRoleById(rowUserId, EUserRole[newValue as keyof typeof EUserRole]);
                            meta.updateData(row.index, column.id, newValue);
                        } finally {
                            meta.setLoading(row.index, column.id, false);
                        }
                    };

                    return (
                        <TableSelect
                            loading={loading}
                            disabled={disabled}
                            value={initialValue}
                            onChange={(v) => onChange(v as string)}
                            options={opts}
                        />
                    );
                },
                meta: {
                    filterVariant: ETableFilterVariant.SELECT,
                },
                size: 120,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: (info: CellContext<IUser, unknown>) => {
                    const { getValue, table: infoTable, row, column } = info;
                    const initialValue = getValue() as string;
                    const user = row.original;
                    const isPending = user.status === EUserStatus.PENDING;
                    const opts = Object.values(EUserStatusPendingResolve);

                    const meta = (infoTable.options.meta) as TableMeta<IUser>;

                    const loading = meta.getLoading(row.index, column.id);

                    const onChange = async (value?: EUserStatusPendingResolve) => {
                        if (!value) return;
                        try {
                            meta.setLoading(row.index, column.id);
                            await setUserAccessRequestDecision(user.id, user.accessRequestId, value);
                            const nextValue = EUserStatusPendingResolve.ACCEPT
                                ? EUserStatus.ACTIVE
                                : EUserStatus.INACTIVE;
                            meta.updateData(row.index, column.id, nextValue);
                        } finally {
                            meta.setLoading(row.index, column.id, false);
                        }
                    };

                    return (
                        <TableSelect
                            loading={loading}
                            disabled={!isPending}
                            value={initialValue}
                            onChange={(v) => onChange(v as EUserStatusPendingResolve)}
                            options={opts}
                        />
                    );
                },
                meta: {
                    filterVariant: ETableFilterVariant.SELECT,
                },
                filterFn: filterStatusFn,
                sortingFn: sortStatusFn,
                size: 120,
            },
            {
                id: 'row-select-action',
                accessorKey: 'row-select-action',
                header: ({ table }) => {
                    const isChecked = table.getIsAllPageRowsSelected();
                    const isIndeterminate = table.getIsAllPageRowsSelected()
                        ? table.getIsSomePageRowsSelected()
                        : table.getIsSomeRowsSelected();

                    const onSelect = () => {
                        const isIndeterminate = table.getIsSomePageRowsSelected();
                        const state = isChecked || isIndeterminate;
                        table.toggleAllPageRowsSelected(!state);
                    };

                    const onDelete = () => {
                        const rows = table.getSelectedRowModel().rows;
                        const usersToDelete = rows.map(r => r.original);
                        setUsersToDelete(usersToDelete);
                    };

                    return (
                        <AdministrationTableSelectAction
                            isChecked={isChecked}
                            isIndeterminate={isIndeterminate}
                            disabledDelete={!table.getIsSomeRowsSelected()}
                            onSelect={onSelect}
                            onDelete={onDelete}
                        />
                    );
                },
                cell: (info: CellContext<IUser, unknown>) => {
                    const { table, row } = info;

                    const onSelect = () => {
                        row.toggleSelected(!row.getIsSelected());
                    };

                    const onDelete = () => {
                        const rows = table.getSelectedRowModel().rows;
                        const usersToDelete = rows.map(r => r.original);
                        setUsersToDelete([...new Set([...usersToDelete, row.original])]);
                    };

                    const disabledSelect = !row.getCanSelect();
                    const disabledDelete = disabledSelect || row.original.id === currentUser?.id;

                    return (
                        <Stack
                            sx={({ spacing }) => ({
                                padding: spacing(0, 2.5)
                            })}
                        >
                            <AdministrationTableSelectAction
                                disabledSelect={!row.getCanSelect()}
                                disabledDelete={disabledDelete}
                                isChecked={row.getIsSelected()}
                                isIndeterminate={row.getIsSomeSelected()}
                                onSelect={onSelect}
                                onDelete={onDelete}
                            />
                        </Stack>
                    );
                },
                size: 72,
                enableSorting: false,
            },
        ];
    }, [maxTitleSize, currentUser, setUserAccessRequestDecision, setUserRoleById]);

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
                globalFilter={globalFilter}
                data={data}
                columns={columns}
                numCol
                showPagination
                rowStyleOverrides={(row) => {
                    const isPending = row.original.status === EUserStatus.PENDING;
                    const color = isPending ? COLORS.ACTIVE : 'unset';
                    return {
                        color,
                    };
                }}
                tableOptions={{
                    enableRowSelection: row => row.original.id !== currentUser?.id
                }}
            />
            <ConfirmDeleteDialog
                usersToDelete={usersToDelete}
                onClose={() => setUsersToDelete([])}
            />
        </Stack>
    );
});