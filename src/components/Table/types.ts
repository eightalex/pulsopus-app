import { ColumnDef, TableState, Updater, useReactTable } from "@tanstack/react-table";
import { SortDirection, TableOptions } from "@tanstack/table-core";
import { ETableColumnType, ETableFilterVariant } from "@/components/Table/constants.ts";

export type TSortDirection = null | false | SortDirection;

export type TTable<Data> = ReturnType<typeof useReactTable<Data>>;

// export interface IColumnDef<Data> extends ColumnDef<Data> {
//     type?: ETableColumnType,
//     meta: ColumnDef<Data>['meta'] & {
//         filterVariant: ETableFilterVariant
//     }
// }

export interface IColumnDefMeta<Data> {
    type?: ETableColumnType,
    meta: ColumnDef<Data>['meta'] & {
        filterVariant: ETableFilterVariant
    }
}

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
}