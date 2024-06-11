import usePagination from '@mui/material/usePagination';

import { TablePaginationRowStyled, TablePaginationStyled } from "./styled.tsx";
import { ETablePaginationButtonType, TablePaginationButton } from './TablePaginationButton';
import { ITablePagination } from "./types.ts";

export function TablePagination<Data>(props: ITablePagination<Data>) {
    const { table } = props;
    const { items } = usePagination({
        count: table.getPageCount(),
        boundaryCount: 1,
        defaultPage: 1,
        page: table.getState().pagination.pageIndex + 1,
        onChange: (_, page) => {
            table.setPageIndex(page - 1);
        }
    });

    return (
        <TablePaginationStyled>
            <TablePaginationRowStyled>
                {items.map(({ type: pagType, page, disabled, onClick, selected }) => {
                    const type = pagType as ETablePaginationButtonType;
                    const key = `${type}-${page}`;
                    return (
                        <TablePaginationButton
                            key={key}
                            selected={selected}
                            type={type}
                            title={(page || '').toString()}
                            onClick={onClick}
                            disabled={disabled}
                        />
                    );
                })}
            </TablePaginationRowStyled>
        </TablePaginationStyled>
    );
}