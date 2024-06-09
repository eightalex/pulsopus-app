import { DetailedHTMLProps, MouseEvent, ReactNode, ThHTMLAttributes } from "react";
import { SortDirection } from "@tanstack/table-core";

type TSortDirection = null | false | SortDirection;
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
    title?: string | ReactNode;
}