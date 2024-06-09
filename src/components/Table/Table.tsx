import Stack from "@mui/material/Stack";
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import {
    DEFAULT_COLUMN_MAX_SIZE,
    DEFAULT_COLUMN_MIN_SIZE,
    DEFAULT_COLUMN_SIZE,
} from "@/components/Table/constants.ts";
import { ITableProps } from "@/components/Table/types.ts";

import { headerColPersistFormatter } from "./col.helpers.ts";
import { rowNumCol } from "./col.presets.tsx";
import { TableStyled } from "./styled.tsx";
import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";

export function Table<Data>(props: ITableProps<Data>) {
    const {
        data,
        columns,
        numCol = false,
    } = props;
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<{ [index: number]: boolean }>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const cols = useMemo<ColumnDef<Data>[]>(() => {
        let result = [...columns];
        if(numCol) {
            result = [rowNumCol, ...result];
        }
        return result.map(headerColPersistFormatter<Data>);
    }, [columns, numCol]);

    const table = useReactTable({
        columns: cols,
        data,
        state: {
            sorting,
            rowSelection,
            columnFilters,
            // rowSelection: { ...rowSelection, 2: true },
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), //client-side sorting
        onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        // sortingFns: {
        //   sortStatusFn, //or provide our custom sorting function globally for all columns to be able to use
        // },
        getFacetedRowModel: getFacetedRowModel(), // client-side faceting
        getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), //client-side filtering
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(), // client-side faceting
        getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
        getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
        defaultColumn: {
            size: DEFAULT_COLUMN_SIZE,
            minSize: DEFAULT_COLUMN_MIN_SIZE,
            maxSize: DEFAULT_COLUMN_MAX_SIZE,
        },
        //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
        // autoResetPageIndex: false, // turn off page index reset when sorting or filtering - default on/true
        // enableMultiSort: false, //Don't allow shift key to sort multiple columns - default on/true
        // enableSorting: false, // - default on/true
        // enableSortingRemoval: false, //Don't allow - default on/true
        // isMultiSortEvent: (e) => true, //Make all clicks multi-sort - default requires `shift` key
        // maxMultiSortColCount: 3, // only allow 3 columns to be sorted at once - default is Infinity
    });
    return (
        <Stack direction='row'>
            <TableStyled size="small" stickyHeader={false}>
                <TableHead table={table}/>
                <TableBody table={table}/>
            </TableStyled>
        </Stack>
    );
}