import { RowData } from "@tanstack/table-core";
import { ETableColumnType, ETableFilterVariant } from "@/components/Table/constants.ts";

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        filterVariant?: ETableFilterVariant;
        type?: ETableColumnType;
        updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: ETableFilterVariant;
        type?: ETableColumnType;
    }
}