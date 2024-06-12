import { CSSProperties } from "react";
import { ColumnDef, Row, TableState, Updater, useReactTable } from "@tanstack/react-table";
import { InitialTableState, SortDirection, TableOptions } from "@tanstack/table-core";
import { ITableBodyProps } from "@/components/Table/TableBody";

export type TSortDirection = null | false | SortDirection;

export type TTable<Data> = ReturnType<typeof useReactTable<Data>>;

export type TTableStyleOverrides<Data> = (row: Row<Data>) => CSSProperties;

export interface ITableHook<Data> {
    table: TTable<Data>;
}

export interface ITableModule<Data> extends ITableHook<Data> {
    getRef?: (ref: HTMLDivElement) => void;
}

export interface ITableProps<Data> {
    data: Data[];
    onChange?: (updater: Updater<TableState>) => void,
    columns: ColumnDef<Data>[];
    numCol?: boolean;
    tableOptions?: Partial<TableOptions<Data>>;
    showPagination?: boolean;
    rowStyleOverrides?: ITableBodyProps<Data>["styleOverrides"];
    getTable?: (table: TTable<Data>, data?: Data[]) => void;
    initialState?: Partial<InitialTableState>;
}