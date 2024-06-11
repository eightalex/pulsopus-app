import { ITableModule } from "@/components/Table/types.ts";

export interface ITableBodyProps<Data> extends ITableModule<Data> {
    maxPerPage?: number;
}