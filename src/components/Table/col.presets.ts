import { ColumnDef } from "@tanstack/react-table";

export const numberCol: ColumnDef<unknown> = {
    id: 'numCol',
    header: '',
    accessorKey: '#',
    cell: info => info.row.index + 1,
    enableSorting: false,
    size: 46,
    minSize: 46,
    maxSize: 46,
    enableResizing: false,
};