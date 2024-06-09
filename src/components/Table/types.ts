import { ColumnDef, useReactTable } from "@tanstack/react-table";
import { SortDirection } from "@tanstack/table-core";

export type TSortDirection = null | false | SortDirection;
export interface ITableHook {
    table: ReturnType<typeof useReactTable>;
}

export interface ITableProps<Data> {
    data: Data[];
    columns: ColumnDef<Data>[];
    numCol?: boolean;
}