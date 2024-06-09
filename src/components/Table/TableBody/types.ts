import { ITableHook } from "@/components/Table/types.ts";

export interface ITableBodyProps extends ITableHook {
    maxPerPage?: number;
}