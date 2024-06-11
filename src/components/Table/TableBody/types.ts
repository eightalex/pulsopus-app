import { CSSProperties } from "react";
import { ITableModule, TTableStyleOverrides } from "@/components/Table/types.ts";

export interface ITableBodyProps<Data> extends ITableModule<Data> {
    maxPerPage?: number;
    styleOverrides?: CSSProperties | TTableStyleOverrides<Data>;
}