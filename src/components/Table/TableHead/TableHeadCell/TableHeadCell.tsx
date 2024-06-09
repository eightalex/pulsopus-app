import { MouseEvent, ReactNode, useCallback, useMemo, useState } from "react";
import ReactDOMServer from 'react-dom/server';

import Typography from "@/components/Typography";

import { TableHeadCellStyled, TableHeadCellTitleStyled } from "./styled.tsx";
import { TableHeadCellSort } from "./TableHeadCellSort.tsx";
import { ITableHeadCellProps } from "./types.ts";

const isChildNull = (children: ReactNode) => {
    // return !Children.count(children);
    return !ReactDOMServer.renderToStaticMarkup(children);
};

export function TableHeadCell(props: ITableHeadCellProps){
    const {
        title,
        onClick,
        sortDirection,
        disableSortView,
        ...restProps
    } = props;
    const [rowHovered, setRowHovered] = useState(false);

    const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e && e.preventDefault();
        onClick?.(e);
    }, [onClick]);

    const disabledSortView = useMemo((): boolean => {
        return Boolean(disableSortView || isChildNull(title));
    }, [disableSortView, title]);

    return (
        <TableHeadCellStyled
            {...restProps}
            onMouseEnter={() => setRowHovered(true)}
            onMouseLeave={() => setRowHovered(false)}
            canAction={!disabledSortView}
        >
            <TableHeadCellTitleStyled
                onClick={handleClick}
            >
                <Typography variant="text" textTransform='uppercase'>
                    {title}
                </Typography>
                <TableHeadCellSort
                    sortDirection={sortDirection}
                    showSortDefaultView={rowHovered}
                    disableSortView={disabledSortView}
                />
            </TableHeadCellTitleStyled>
        </TableHeadCellStyled>
    );
}