import { ColumnDef, useReactTable } from "@tanstack/react-table";
import { SortDirection } from "@tanstack/table-core";
import { ETableColumnType, ETableFilterVariant } from "@/components/Table/constants.ts";

export type TSortDirection = null | false | SortDirection;

export type TTable = ReturnType<typeof useReactTable>;

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

export interface ITableHook {
    table: TTable;
}

export interface ITableProps<Data> {
    data: Data[];
    columns: ColumnDef<Data>[];
    numCol?: boolean;
}