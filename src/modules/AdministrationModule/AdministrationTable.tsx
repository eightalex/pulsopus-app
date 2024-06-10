import Stack from "@mui/material/Stack";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingFn,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { observer } from "mobx-react";
import React, { HTMLProps, useMemo, useState } from 'react';

import { ETableFilterVariant, Table } from "@/components/Table";
import { useStores } from "@/hooks";
import { IUser } from "@/interfaces";

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

const sortStatusFn: SortingFn<IUser> = (rowA, rowB, _columnId) => {
    const statusA = rowA.original.status;
    const statusB = rowB.original.status;
    const statusOrder = ['INACTIVE', 'ACTIVE'];
    return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
};

export const AdministrationTable = observer(() => {
    const { rootStore: { usersStore: { users } } } = useStores();

    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<{ [index: number]: boolean }>({});

    const columns = useMemo<ColumnDef<IUser>[]>(
        () => [
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
                header: 'Roles',
                cell: info => {
                    return [...info.getValue()].join('/');
                },
                meta: {
                    filterVariant: ETableFilterVariant.SELECT,
                },
            },
            {
                accessorKey: 'status',
                header: 'Status',
                meta: {
                    filterVariant: ETableFilterVariant.SELECT,
                },
                sortingFn: sortStatusFn,
            },
        ],
        []
    );

    const [data, setData] = useState(() => users);

    const table = useReactTable({
        columns,
        data,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), //client-side sorting
        onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
        // sortingFns: {
        //   sortStatusFn, //or provide our custom sorting function globally for all columns to be able to use
        // },
        //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
        state: {
            sorting,
            rowSelection,
        },
        // autoResetPageIndex: false, // turn off page index reset when sorting or filtering - default on/true
        // enableMultiSort: false, //Don't allow shift key to sort multiple columns - default on/true
        // enableSorting: false, // - default on/true
        // enableSortingRemoval: false, //Don't allow - default on/true
        // isMultiSortEvent: (e) => true, //Make all clicks multi-sort - default requires `shift` key
        // maxMultiSortColCount: 3, // only allow 3 columns to be sorted at once - default is Infinity
    });

    //access sorting state from the table instance
    console.log(table.getState().sorting);
    const test = true;

    if (test) {
        return (
            <Stack direction='row' maxWidth='1000px' width='100%'>
                <Table
                    // data={[...data, ...data]}
                    data={data}
                    columns={columns}
                    numCol
                />
            </Stack>
        );
    }

    return (
        <>
            <Stack direction='row' maxWidth='1000px' width='100%'>
                <Table
                    data={data}
                    columns={columns}
                    numCol
                />
            </Stack>
            <div className="p-2">
                <div className="h-2"/>
                <table>
                    <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={
                                                    header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : ''
                                                }
                                                onClick={header.column.getToggleSortingHandler()}
                                                title={
                                                    header.column.getCanSort()
                                                        ? header.column.getNextSortingOrder() === 'asc'
                                                            ? 'Sort ascending'
                                                            : header.column.getNextSortingOrder() === 'desc'
                                                                ? 'Sort descending'
                                                                : 'Clear sort'
                                                        : undefined
                                                }
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table
                        .getRowModel()
                        .rows.slice(0, 10)
                        .map(row => {
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <pre>{JSON.stringify(sorting, null, 2)}</pre>
            </div>
        </>
    );
});