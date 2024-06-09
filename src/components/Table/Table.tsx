import {
    ColumnDef,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import { useMemo,useState } from "react";

import { ITableProps } from "@/components/Table/types.ts";

import { numberCol } from "./col.presets.ts";
import { TableStyled } from "./styled.tsx";
import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";

export function Table <Data>(props: ITableProps<Data>) {
    const {
        data,
        columns,
        numCol = false,
    } = props;
    const [sorting, setSorting] = useState<SortingState>([]);

    const cols = useMemo<ColumnDef<Data>[]>(() => {
        if(!numCol) return columns;
        return [
            numberCol,
            ...columns
        ];
    }, [columns, numCol]);

    const table = useReactTable({
        columns: cols,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), //client-side sorting
        onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
        // sortingFns: {
        //   sortStatusFn, //or provide our custom sorting function globally for all columns to be able to use
        // },
        //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
        state: {
            sorting,
        },
        // autoResetPageIndex: false, // turn off page index reset when sorting or filtering - default on/true
        // enableMultiSort: false, //Don't allow shift key to sort multiple columns - default on/true
        // enableSorting: false, // - default on/true
        // enableSortingRemoval: false, //Don't allow - default on/true
        // isMultiSortEvent: (e) => true, //Make all clicks multi-sort - default requires `shift` key
        // maxMultiSortColCount: 3, // only allow 3 columns to be sorted at once - default is Infinity
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });
    return (
        <TableStyled>
            <TableHead table={table}/>
            <TableBody table={table} />
        </TableStyled>
    );
}