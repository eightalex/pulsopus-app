import { FC, useMemo } from "react";

import { ETablePaginationButtonType, ITablePaginationButtonProps, tablePaginationButtonByType } from "@/components/Table";
import { TablePaginationButtonTitleStyled } from "@/components/Table/TablePagination/TablePaginationButton/styled.tsx";
import Typography from "@/components/Typography";
import { ChevronLeftIcon, ChevronRightIcon } from '@/icons';

export const TablePaginationButtonControl: FC<ITablePaginationButtonProps> = (props) => {
    const {
        type = ETablePaginationButtonType.PAGE,
        title,
        ...restProps
    } = props;

    const text = useMemo(() => tablePaginationButtonByType[type], [type]);

    const icon = useMemo(() => {
        const Icon = type === ETablePaginationButtonType.PREV ? ChevronLeftIcon : ChevronRightIcon;
        return <Icon/>;
    }, [type]);

    const buttonProps = useMemo(() => {
        const baseButtonProps = {
            title,
            ...restProps,
        };

        delete baseButtonProps.startIcon;
        delete baseButtonProps.endIcon;

        if(type === ETablePaginationButtonType.PREV) {
            return {
                ...baseButtonProps,
                startIcon: icon,
            };
        }
        if(type === ETablePaginationButtonType.NEXT) {
            return {
                ...baseButtonProps,
                endIcon: icon,
            };
        }
        return baseButtonProps;
    }, [icon, restProps, title, type]);

    return (
        <TablePaginationButtonTitleStyled
            {...buttonProps}
            variant="text"
            title={text}
        >
            <Typography
              color='inherit'
              textAlign='center'
              variant='body1'
            >
                {text}
            </Typography>
        </TablePaginationButtonTitleStyled>
    );
};