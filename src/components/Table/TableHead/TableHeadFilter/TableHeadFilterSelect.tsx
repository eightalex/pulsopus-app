import { FC, useCallback, useMemo } from "react";

import { ETableFilterVariant } from "@/components/Table";
import { TableSelect } from "@/components/Table/TableSelect";

import { ITableHeadFilterComponent } from "./TableHeadFilter.tsx";

export const TableHeadFilterSelect: FC<Required<ITableHeadFilterComponent>> = (props) => {
    const { header } = props;
    const { column } = header;
    const meta = header?.column?.columnDef?.meta || {};
    const { filterVariant } = meta as { filterVariant: ETableFilterVariant };
    const columnFilterValue = header?.column?.getFilterValue();

    const sortedUniqueValues = useMemo(
        () => {
            switch (filterVariant) {
                case ETableFilterVariant.SELECT:
                    return Array.from(column.getFacetedUniqueValues().keys()).sort();
                default:
                    return [];
            }
        }, [column, filterVariant]
    );

    const handleChange = useCallback((value?: string) => {
        column.setFilterValue(value);
    }, [column]);

    return (
        <TableSelect
            title={header.id}
            value={columnFilterValue?.toString()}
            onChange={handleChange}
            options={sortedUniqueValues}
        />
    );
};