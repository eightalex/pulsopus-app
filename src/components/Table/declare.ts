import { FilterFn } from "@tanstack/react-table";
import { RowData } from "@tanstack/table-core";
import { ETableColumnType, ETableFilterVariant } from "@/components/Table/constants.ts";

class RankingInfo {
}

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        filterVariant?: ETableFilterVariant;
        type?: ETableColumnType;
        updateData: (rowIndex: number, columnId: string, value: unknown) => void;
        setLoading: (rowIndex: number, columnId: string, state?: boolean) => void;
        getLoading: (rowIndex: number, columnId: string) => boolean;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: ETableFilterVariant;
        type?: ETableColumnType;
    }

    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}