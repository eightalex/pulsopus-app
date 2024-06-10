import { ColumnDef } from "@tanstack/react-table";
import { rowNumCol, rowSelectCol } from "./col.presets.tsx";
import { ETableColumnType, ROW_NUM_COL_KEY, ROW_SELECT_COL_KEY } from "./constants.ts";

export const headerColPersistFormatter = <Data>(col: ColumnDef<Data>) => {
    const { accessorKey = '', id, type } = col as ColumnDef<Data> & { type?: ETableColumnType, accessorKey: string };
    if([accessorKey, id].includes(ROW_NUM_COL_KEY) || type === ETableColumnType.ROW_NUMBER) {
        return { ...rowNumCol, ...col };
    }
    if([accessorKey, id].includes(ROW_SELECT_COL_KEY) || type === ETableColumnType.ROW_SELECT) {
        return { ...rowSelectCol, ...col };
    }
    return col;
};