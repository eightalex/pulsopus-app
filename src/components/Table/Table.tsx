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
import * as d3 from 'd3';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import {
    DEFAULT_COLUMN_MAX_SIZE,
    DEFAULT_COLUMN_MIN_SIZE,
    DEFAULT_COLUMN_SIZE,
} from "@/components/Table/constants.ts";
import { fuzzyFilter } from "@/components/Table/fuzzy.helper.ts";
import { ITableProps } from "@/components/Table/types.ts";
import { IS_DEV } from "@/config";
import { useSkipper } from "@/hooks";

import { headerColPersistFormatter } from "./col.helpers.ts";
import { rowNumCol } from "./col.presets.tsx";
import { TableStyled } from "./styled.tsx";
import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";
import { TablePagination } from "./TablePagination";

const DEFAULT_MIN_ROW_PER_PAGE = 10;

export function Table<Data>(props: ITableProps<Data>) {
    const {
        data: initialData,
        columns,
        numCol = false,
        tableOptions = {},
        onChange,
        showPagination = false,
        rowStyleOverrides,
        getTable,
        initialState = {},
        globalFilter: initialGlobalFilter = '',
    } = props;

    const containerRef = useRef<HTMLDivElement | null>();
    const tableRef = useRef<HTMLTableElement | null>();
    const headRef = useRef<HTMLTableSectionElement | null>();
    const bodyRef = useRef<HTMLTableSectionElement | null>();

    const [data, setData] = useState(initialData);
    const [loadingState, setLoadingState] = useState<{ [rowIndex: number]: { [columnId: string]: boolean } }>({});
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

    const [pageSize, setPageSize] = useState(showPagination ? 10 : data.length);

    const [sorting, setSorting] = useState<SortingState>([...initialState?.sorting || []]);
    const [rowSelection, setRowSelection] = useState<{ [index: number]: boolean }>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize,
    });
    const [globalFilter, setGlobalFilter] = useState(initialGlobalFilter);

    const cols = useMemo<ColumnDef<Data>[]>(() => {
        let result = [...columns];
        if (numCol) {
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
        filterFns: {
            fuzzy: fuzzyFilter
        },
        state: {
            ...initialState,
            sorting,
            rowSelection,
            columnFilters,
            pagination,
            globalFilter,
        },
        autoResetPageIndex,
        onStateChange: onChange,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: 'fuzzy',
        onPaginationChange: setPagination,
        defaultColumn: {
            size: DEFAULT_COLUMN_SIZE,
            minSize: DEFAULT_COLUMN_MIN_SIZE,
            maxSize: DEFAULT_COLUMN_MAX_SIZE,
        },
        maxMultiSortColCount: 3,
        meta: {
            filterVariant: undefined,
            ...(tableOptions?.meta || {}),
            updateData: (rowIndex, columnId, value) => {
                skipAutoResetPageIndex();
                setData(old =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex]!,
                                [columnId]: value,
                            };
                        }
                        return row;
                    })
                );
            },
            setLoading: (rowIndex, columnId, state = true) => {
                skipAutoResetPageIndex();
                setLoadingState(prev => ({
                    ...prev,
                    [rowIndex]: {
                        ...prev[rowIndex],
                        [columnId]: Boolean(state)
                    }
                }));
            },
            getLoading: (rowIndex, columnId): boolean => {
                skipAutoResetPageIndex();
                const rowState = loadingState[rowIndex] || {};
                return Boolean(rowState[columnId]);
            },
        },
        ...tableOptions,
        debugTable: IS_DEV,
        debugHeaders: IS_DEV,
        debugColumns: IS_DEV,
    });

    const calculatePageSize = useCallback(() => {
        if (!showPagination) {
            setPageSize(data.length);
            table.setPageSize(data.length);
            return;
        }

        if (!containerRef?.current || !headRef?.current) return;

        const bH = containerRef.current?.clientHeight - headRef.current?.clientHeight - 90;

        let maxRowHeight = 40;

        try {
            const tbody = containerRef.current?.querySelector('tbody');
            if (!tbody) return;
            const trs = tbody.querySelectorAll('tr');
            const tsHs = Array.from(trs).map((tr) => tr.offsetHeight);
            const [_, max] = d3.extent(tsHs);
            if (!max) return;
            maxRowHeight = max;
        } catch (err) {
            console.error(err);
        }

        const pS = Math.max(DEFAULT_MIN_ROW_PER_PAGE, Math.floor(bH / maxRowHeight));
        setPageSize(pS);
        table.setPageSize(pS);
    }, [data.length, showPagination, table]);

    useLayoutEffect(() => {
        calculatePageSize();
    }, [calculatePageSize]);

    useEffect(() => {
        getTable?.(table, data);
    }, [getTable, table, data]);

    useEffect(() => {
        skipAutoResetPageIndex();
        setData(initialData);
    }, [initialData, skipAutoResetPageIndex]);

    useEffect(() => {
        setGlobalFilter(initialGlobalFilter);
    }, [initialGlobalFilter]);

    return (
        <Stack
            spacing={0}
            overflow='hidden'
            flexGrow={1}
            justifyContent='space-between'
            height='100%'
            component='div'
            ref={(r) => containerRef.current = r}
        >
            <Stack
                flexGrow={0}
                overflow='auto'
                maxHeight='100%'
                position='relative'
            >
                <TableStyled
                    size="small"
                    stickyHeader={!showPagination && false}
                    ref={(r) => tableRef.current = r}
                >
                    <TableHead<Data>
                        table={table}
                        getRef={(r) => headRef.current = r}
                    />
                    <TableBody<Data>
                        table={table}
                        styleOverrides={rowStyleOverrides}
                        getRef={(r) => bodyRef.current = r}
                    />
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