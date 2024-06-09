import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { flexRender } from "@tanstack/react-table";
import React, { FC, useCallback } from "react";

import { ETableFilterVariant } from "@/components/Table";
import { TableSelect } from "@/components/Table/TableSelect";

import { ITableHeadFilterComponent } from "./TableHeadFilter.tsx";

export const TableHeadFilterSelect: FC<ITableHeadFilterComponent> = (props) => {
    const { header } = props;
    const { column } = header;
    const meta = header?.column?.columnDef?.meta || {};
    const { filterVariant } = meta;
    const columnFilterValue = header?.column?.getFilterValue();

    console.log('header', header);

    console.log('column.getFacetedUniqueValues()', column.getFacetedUniqueValues());

    const sortedUniqueValues = React.useMemo(
        () =>
            filterVariant !== ETableFilterVariant.SELECT
                ? []
                : Array.from(column.getFacetedUniqueValues().keys())
                    .sort()
                    .slice(0, 5000),
        [column.getFacetedUniqueValues(), filterVariant]
    );

    const handleChange = useCallback((value: string) => {
        column.setFilterValue(value);
    }, [column]);

    return (
        <TableSelect
            value={columnFilterValue?.toString()}
            onChange={handleChange}
            options={sortedUniqueValues}
        />
        // <select
        //     onChange={e => column.setFilterValue(e.target.value)}
        //     value={columnFilterValue?.toString()}
        // >
        //     <option value="">All</option>
        //     {sortedUniqueValues.map(value => (
        //         //dynamically generated select options from faceted values feature
        //         <option value={value} key={value}>
        //             {value}
        //         </option>
        //     ))}
        // </select>
    );
};