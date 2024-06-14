import { Header, RowData, Table } from "@tanstack/table-core";
import { FC } from "react";

import { ETableFilterVariant } from "@/components/Table";
import { TableHeadFilterRowCheckbox } from "@/components/Table/TableHead/TableHeadFilter/TableHeadFilterRowCheckbox.tsx";
import { TableHeadFilterSelect } from "@/components/Table/TableHead/TableHeadFilter/TableHeadFilterSelect.tsx";

interface ITableHeadFilterProps {
    header:  Header<RowData, unknown>;
    table:  Table<RowData>
}

export interface ITableHeadFilterComponent extends Required<ITableHeadFilterProps> {}

const renderFilterByVariant: Record<ETableFilterVariant, FC<Required<ITableHeadFilterProps>>> = {
    [ETableFilterVariant.SELECT]: TableHeadFilterSelect,
    [ETableFilterVariant.ROW_SELECT]: TableHeadFilterRowCheckbox,
};

export const TableHeadFilter: FC<ITableHeadFilterProps> = (props) => {
    const { header, table } = props;
    const meta = header?.column?.columnDef?.meta || {};
    const { filterVariant } = meta as { filterVariant?: ETableFilterVariant };

    if(!filterVariant) {
        return null;
    }

    const Component = renderFilterByVariant[filterVariant];
    return (<Component header={header} table={table}/>);
};