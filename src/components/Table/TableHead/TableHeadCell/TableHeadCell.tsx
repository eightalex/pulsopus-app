import { MouseEvent, ReactNode, useCallback, useMemo, useState } from "react";
import ReactDOMServer from 'react-dom/server';

import { TableHeadCellSort } from "@/components/Table";
import Typography from "@/components/Typography";

import { ITableHeadCellProps } from "../types.ts";
import { TableHeadCellStyled, TableHeadCellTitleStyled } from "./styled.tsx";

const isChildNull = (children: ReactNode) => {
    // return !Children.count(children);
    return !ReactDOMServer.renderToStaticMarkup(children);
};

export function TableHeadCell(props: ITableHeadCellProps) {
    const {
        content,
        onClick,
        sortDirection,
        disableSortView,
        filter= null,
        ...restProps
    } = props;
    const [rowHovered, setRowHovered] = useState(false);

    const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e && e.preventDefault();
        onClick?.(e);
    }, [onClick]);

    const disabledSortView = useMemo((): boolean => {
        return Boolean(disableSortView || isChildNull(content));
    }, [disableSortView, content]);

    return (
        <TableHeadCellStyled
            scope='col'
            {...restProps}
            onMouseEnter={() => setRowHovered(true)}
            onMouseLeave={() => setRowHovered(false)}
            canAction={!disabledSortView}
        >
            <>
                {!filter && (
                    <TableHeadCellTitleStyled onClick={handleClick}>
                        <Typography variant="text" textTransform='uppercase'>
                            {content}
                        </Typography>
                        <TableHeadCellSort
                            sortDirection={sortDirection}
                            showSortDefaultView={rowHovered}
                            disableSortView={disabledSortView}
                        />
                    </TableHeadCellTitleStyled>
                )}
                {Boolean(filter) && filter}
            </>
        </TableHeadCellStyled>
    );
}