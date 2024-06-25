import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { Table } from "@tanstack/table-core";
import { FC, MouseEvent, useCallback } from "react";

import { IUser } from "@/interfaces";

import { SelectActionRowStyled } from ".//styled.tsx";

interface IProps {
    table: Table<IUser>
}

export const AdministrationTableCellSelectAction: FC<IProps> = ({ table }) => {

    const handleRowSelectClick = useCallback((e: MouseEvent) => {
        e && e.preventDefault();
        e && e.stopPropagation();
        const isChecked = table.getIsAllPageRowsSelected();
        const isIndeterminate = table.getIsSomePageRowsSelected();
        const state = isChecked || isIndeterminate;
        table.toggleAllPageRowsSelected(!state);
    }, [table]);

    return (
        <SelectActionRowStyled>
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
        </SelectActionRowStyled>
    );
};