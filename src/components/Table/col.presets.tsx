import Checkbox from '@mui/material/Checkbox';
import Stack from "@mui/material/Stack";
import { ColumnDef } from "@tanstack/react-table";

import {
    DEFAULT_COLUMN_MIN_SIZE,
    ETableColumnType, ETableFilterVariant,
    ROW_NUM_COL_KEY,
    ROW_SELECT_COL_KEY
} from "@/components/Table/constants.ts";
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
    meta: {
        type: ETableColumnType.ROW_NUMBER
    },
    enableSorting: false,
    enableResizing: false,
    ...defSizes,
};

export const rowSelectCol: ColumnDef<unknown> = {
    id: ROW_SELECT_COL_KEY,
    accessorKey: ROW_SELECT_COL_KEY,
    header: ROW_SELECT_COL_KEY,
    cell: ({ row }) => (
        <Stack
            sx={({ spacing }) => ({
                padding: spacing(0, 3),
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
            })}
        >
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
        </Stack>
    ),
    meta: {
        type: ETableColumnType.ROW_SELECT,
        filterVariant: ETableFilterVariant.ROW_SELECT,
    },
    filterFn: (row) => row.getIsSelected(),
    enableSorting: false,
    enableResizing: false,
    ...defSizes,
};