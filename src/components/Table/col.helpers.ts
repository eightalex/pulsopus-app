import { IColumnDef } from "@/components/Table/types.ts";
import { rowNumCol, rowSelectCol } from "./col.presets.tsx";
import { ETableColumnType, ROW_NUM_COL_KEY, ROW_SELECT_COL_KEY } from "./constants.ts";

export const headerColPersistFormatter = <Data>(col: IColumnDef<Data>) => {
    if([col.accessorKey, col.id].includes(ROW_NUM_COL_KEY) || col.type === ETableColumnType.ROW_NUMBER) {
        return { ...rowNumCol, ...col };
    }
    if([col.accessorKey, col.id].includes(ROW_SELECT_COL_KEY) || col.type === ETableColumnType.ROW_SELECT) {
        return { ...rowSelectCol, ...col };
    }
    return col;
};