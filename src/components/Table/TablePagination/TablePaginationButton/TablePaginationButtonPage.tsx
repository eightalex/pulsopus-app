import { FC } from "react";

import { ETablePaginationButtonType, ITablePaginationButtonProps } from "@/components/Table";
import { TablePaginationButtonPageStyled } from "@/components/Table/TablePagination/TablePaginationButton/styled.tsx";
import Typography from "@/components/Typography";

export const TablePaginationButtonPage: FC<ITablePaginationButtonProps> = (props) => {
    const {
        type,
        title,
        ...restProps
    } = props;

    if(type !== ETablePaginationButtonType.PAGE) return null;

    return (
        <TablePaginationButtonPageStyled
            {...restProps}
            variant="text"
        >
            <Typography
                color='inherit'
                textAlign='center'
                lineHeight={1}
                variant='body1'
            >
                {title}
            </Typography>
        </TablePaginationButtonPageStyled>
    );
};