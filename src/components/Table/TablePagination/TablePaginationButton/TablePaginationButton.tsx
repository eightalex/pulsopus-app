import { FC, useMemo } from "react";

import { ETablePaginationButtonType, ITablePaginationButtonProps } from "@/components/Table";

import { TablePaginationButtonControl } from './TablePaginationButtonControl.tsx';
import { TablePaginationButtonEllipsis } from './TablePaginationButtonEllipsis.tsx';
import { TablePaginationButtonPage } from './TablePaginationButtonPage.tsx';

const renderButtonByType: Record<ETablePaginationButtonType, FC<ITablePaginationButtonProps>> = {
    [ETablePaginationButtonType.PAGE]: TablePaginationButtonPage,
    [ETablePaginationButtonType.PREV]: TablePaginationButtonControl,
    [ETablePaginationButtonType.NEXT]: TablePaginationButtonControl,
    [ETablePaginationButtonType.END_ELLIPSIS]: TablePaginationButtonEllipsis,
    [ETablePaginationButtonType.START_ELLIPSIS]: TablePaginationButtonEllipsis,
};

export const TablePaginationButton: FC<ITablePaginationButtonProps> = (props) => {
    const { type } = props;
    const Component = useMemo(() => renderButtonByType[type], [type]);
    return <Component {...props} />;
};