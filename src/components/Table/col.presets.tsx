import Checkbox from '@mui/material/Checkbox';
import { ColumnDef } from "@tanstack/react-table";

import { DEFAULT_COLUMN_MIN_SIZE, ROW_NUM_COL_KEY, ROW_SELECT_COL_KEY } from "@/components/Table/constants.ts";
import Typography from "@/components/Typography";

const defSizes = {
    size: DEFAULT_COLUMN_MIN_SIZE * 0.76,
    minSize: DEFAULT_COLUMN_MIN_SIZE,
    maxSize: DEFAULT_COLUMN_MIN_SIZE,
};

export const rowNumCol: ColumnDef<unknown> = {
    id: ROW_NUM_COL_KEY,
    header: '',
    accessorKey: ROW_NUM_COL_KEY,
    cell: info => <Typography textAlign='center' color='inherit'>{info.row.index + 1}</Typography>,
    enableSorting: false,
    enableResizing: false,
    ...defSizes,
};

export const rowSelectCol: ColumnDef<unknown> = {
    id: ROW_SELECT_COL_KEY,
    header: '',
    accessorKey: ROW_SELECT_COL_KEY,
    header: ({ table }) => (
        <Checkbox
            disabled={false}
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            sx={{
                padding: 0,
            }}
            inputProps={{
                'aria-label': 'select all rows',
            }}
        />
    ),
    cell: ({ row }) => (
        <Checkbox
            disabled={!row.getCanSelect()}
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
            sx={{
                padding: 0,
            }}
            inputProps={{
                'aria-label': 'select row',
            }}
        />
    ),
    enableSorting: false,
    enableResizing: false,
    ...defSizes,
};