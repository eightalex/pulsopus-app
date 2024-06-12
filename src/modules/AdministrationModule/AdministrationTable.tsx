import Stack from "@mui/material/Stack";
import { ColumnDef, TableMeta } from '@tanstack/react-table';
import { observer } from "mobx-react";
import React, { HTMLProps, useMemo, useRef } from 'react';

import Table, { COLORS, ETableColumnType, ETableFilterVariant, ROW_SELECT_COL_KEY, TTable } from "@/components/Table";
import { TableSelect } from "@/components/Table/TableSelect/TableSelect.tsx";
import { userStatusMap } from "@/constants/EUser.ts";
import { useStores } from "@/hooks";
import { IUser } from "@/interfaces";

import { filterRolesFn, filterStatusFn, ROLES_SEPARATOR, sortStatusFn } from "./col.helper.tsx";

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
    const { rootStore: { usersStore: { users: data } } } = useStores();
    const tableRef = useRef<TTable<IUser>>();
    const tableDataRef = useRef<IUser[]>();

    const columns = useMemo<ColumnDef<IUser>[]>(() => [
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
            accessorKey: 'roles',
            header: 'Role',
            cell: info => {
                return [(info.getValue() as string[]).join(ROLES_SEPARATOR)];
            },
            filterFn: filterRolesFn,
            meta: {
                filterVariant: ETableFilterVariant.SELECT,
            },
            getUniqueValues: (row) => [row.roles.join(ROLES_SEPARATOR)],
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: (info) => {
                const { getValue, table: infoTable, row, column } = info;
                const initialValue = getValue() as string;
                const opts = [...userStatusMap].map(([_, v]) => v);
                const meta = (infoTable.options.meta) as TableMeta<IUser>;

                const onChange = (newValue?: string) => {
                    if(!newValue) return;
                    meta.updateData(row.index, column.id, newValue);
                };

                return (
                    <TableSelect
                        value={initialValue}
                        onChange={onChange}
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
            accessorKey: ROW_SELECT_COL_KEY,
            meta: {
                type: ETableColumnType.ROW_SELECT
            }
        }
    ], []);

    return (
        <Stack direction='row' maxWidth='1000px' width='100%' flexGrow={1}>
            <Table
                getTable={(t, d) => {
                    tableRef.current = t;
                    tableDataRef.current = d;
                }}
                // data={data}
                data={[...data, ...data]}
                columns={columns}
                numCol
                showPagination
                rowStyleOverrides={(row) => {
                    return {
                        color: row.original?.isPending ? COLORS.ACTIVE : 'unset',
                    };
                }}
                initialState={{
                    sorting: [
                        {
                            id: 'status',
                            desc: false,
                        }
                    ]
                }}
                onChange={(updater) => console.log('updater', updater)}
            />
        </Stack>
    );
});