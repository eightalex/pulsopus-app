import { ITableHook } from "@/components/Table";

export type * from './TablePaginationButton/types.ts';
export interface ITablePagination<Data> extends ITableHook<Data> {}