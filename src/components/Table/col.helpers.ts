import { ColumnDef } from "@tanstack/react-table";
import { rowNumCol, rowSelectCol } from "./col.presets.tsx";
import { ETableColumnType } from "./constants.ts";

export const headerColPersistFormatter = <Data>(col: ColumnDef<Data>) => {
    const { meta: { type } = {} } = col as ColumnDef<Data> & { meta: { type?: ETableColumnType } };
    if(!type) return col;
    switch (type) {
        case ETableColumnType.ROW_NUMBER:
            return { ...rowNumCol, ...col };
        case ETableColumnType.ROW_SELECT:
            return { ...rowSelectCol, ...col };
        default:
            return col;
    }
};