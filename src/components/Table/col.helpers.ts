import { ColumnDef, ColumnMeta } from "@tanstack/react-table";
import { rowNumCol, rowSelectCol } from "./col.presets.tsx";
import { ETableColumnType } from "./constants.ts";

const updateColDef = <Data>(...col: ColumnDef<Data>[]): ColumnDef<Data> => {
    const meta = col.reduce((acc, c) => {
        return { ...acc, ...c.meta };
    }, {} as ColumnMeta<Data, unknown>);

    const res = col.reduce((acc, c) => {
        return { ...acc, ...c };
    }, {} as ColumnDef<Data>);

    return { ...res, meta };
};

export const headerColPersistFormatter = <Data>(col: ColumnDef<Data>) => {
    const { meta: { type } = {} } = col as ColumnDef<Data> & { meta: { type?: ETableColumnType } };
    if(!type) return col;
    switch (type) {
        case ETableColumnType.ROW_NUMBER:
            return updateColDef<Data>(col, rowNumCol as ColumnDef<Data>);
        case ETableColumnType.ROW_SELECT:
            return updateColDef<Data>(col, rowSelectCol as ColumnDef<Data>);
        default:
            return col;
    }
};