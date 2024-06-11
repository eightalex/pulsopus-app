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
    getSortedRowModel, PaginationState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

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
import { TablePagination } from "./TablePagination";

const DEFAULT_MIN_ROW_PER_PAGE = 10;

export function Table<Data>(props: ITableProps<Data>) {
    const {
        data,
        columns,
        numCol = false,
        tableOptions = {},
        onChange,
        showPagination = false,
    } = props;

    const containerRef = useRef<HTMLDivElement | null>();
    const headRef = useRef<HTMLDivElement | null>();

    const [pageSize, setPageSize] = useState(showPagination ? 10 : data.length);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<{ [index: number]: boolean }>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize,
    });

    const cols = useMemo<ColumnDef<Data>[]>(() => {
        let result = [...columns];
        if(numCol) {
            result = [
                rowNumCol as ColumnDef<Data>,
                ...result
            ];
        }
        return result.map(headerColPersistFormatter<Data>) as ColumnDef<Data>[];
    }, [columns, numCol]);

    const table = useReactTable({
        columns: cols,
        data,
        state: {
            sorting,
            rowSelection,
            columnFilters,
            pagination,
        },
        onStateChange: onChange,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), //client-side sorting
        onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getFacetedRowModel: getFacetedRowModel(), // client-side faceting
        getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(), //client-side filtering
        getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        defaultColumn: {
            size: DEFAULT_COLUMN_SIZE,
            minSize: DEFAULT_COLUMN_MIN_SIZE,
            maxSize: DEFAULT_COLUMN_MAX_SIZE,
        },
        maxMultiSortColCount: 3,
        autoResetPageIndex: true,
        ...tableOptions,
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
        // isMultiSortEvent: (e) => true, //Make all clicks multi-sort - default requires `shift` key
        // autoResetPageIndex: false, // turn off page index reset when sorting or filtering - default on/true
        // enableMultiSort: false, //Don't allow shift key to sort multiple columns - default on/true
        // enableSorting: false, // - default on/true
        // enableSortingRemoval: false, //Don't allow - default on/true
    });

    const calculatePageSize = useCallback(() => {
        if(!showPagination || !containerRef?.current || !headRef?.current) return;
        const bH = containerRef.current?.clientHeight - headRef.current?.clientHeight - 80;
        const ROW_HEIGHT = 40;
        const pS = Math.max(DEFAULT_MIN_ROW_PER_PAGE, Math.floor(bH/ROW_HEIGHT));
        setPageSize(pS);
        table.setPageSize(pS);
    }, [showPagination, table]);

    useLayoutEffect(() => {
        calculatePageSize();
    }, [calculatePageSize]);

    return (
            <Stack
                spacing={10}
                overflow='hidden'
                flexGrow={1}
                justifyContent='space-between'
                height='100%'
                component='div'
                ref={(r) => containerRef.current = r}
            >
                <Stack flexGrow={0}>
                    <TableStyled size="small" stickyHeader={false}>
                        <TableHead<Data> table={table} getRef={(r) => headRef.current = r}/>
                        <TableBody<Data> table={table}/>
                    </TableStyled>
                </Stack>
                <Stack flexGrow={2}>
                    {showPagination && table.getPageCount() > 1 && (
                        <TablePagination<Data> table={table}/>
                    )}
                </Stack>
            </Stack>
    );
}