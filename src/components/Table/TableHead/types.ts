import { DetailedHTMLProps, MouseEvent, ReactNode, ThHTMLAttributes } from "react";
import { ITableHook } from "@/components/Table/types.ts";

export interface ITableHeadProps extends ITableHook {}
export interface ITableHeadCellSortProps {
    sortDirection?: TSortDirection;
    showSortDefaultView?: boolean;
    disableSortView?: boolean;
}

interface IThHTMLAttributes extends DetailedHTMLProps<ThHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement> {}

export interface ITableHeadCellProps
    extends Omit<IThHTMLAttributes, 'title'>, ITableHeadCellSortProps {
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    content?: string | ReactNode;
}