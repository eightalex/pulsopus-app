import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { FC, MouseEvent, useCallback } from "react";

import { ITableHeadFilterComponent } from "./TableHeadFilter.tsx";

export const TableHeadFilterRowCheckbox: FC<Required<ITableHeadFilterComponent>> = (props) => {
    const { header, table } = props;
    const { column } = header;
    const columnFilterValue = header?.column?.getFilterValue();

    const handleFilterClick = useCallback(() => {
        const isSomeSelected = table.getIsSomeRowsSelected();
        if(!isSomeSelected) {
            column.setFilterValue(undefined);
            return;
        }
        const filterState = columnFilterValue ? '' : true;
        column.setFilterValue(filterState);
    }, [table, column, columnFilterValue]);

    const handleRowSelectClick = useCallback((e: MouseEvent) => {
        e && e.preventDefault();
        e && e.stopPropagation();
        const isChecked = table.getIsAllPageRowsSelected();
        const isIndeterminate = table.getIsSomePageRowsSelected();
        const state = isChecked || isIndeterminate;
        table.toggleAllPageRowsSelected(!state);
    }, [table]);

    return (
        <Stack
            sx={({ spacing }) => ({
                cursor: 'pointer',
                height: '100%',
                alignItems: 'center',
                padding: spacing(0, 3),
            })}
            direction='row'
            onClick={handleFilterClick}
        >
            <Checkbox
                disabled={false}
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={table.getIsAllPageRowsSelected()
                    ? table.getIsSomePageRowsSelected()
                    : table.getIsSomeRowsSelected()
                }
                onClick={handleRowSelectClick}
                sx={{
                    padding: 0,
                }}
                inputProps={{
                    'aria-label': 'select all rows',
                }}
            />
        </Stack>
    );
};