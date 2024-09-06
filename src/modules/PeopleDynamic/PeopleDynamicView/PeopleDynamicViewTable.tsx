import { Stack } from '@mui/material';
import { ColumnDef } from "@tanstack/react-table";
import { observer } from 'mobx-react';
import { useMemo } from "react";

import Table, { ETableFilterVariant } from "@/components/Table";
import { DEFAULT_BLANK_KEY } from "@/components/Table/TableSelect";
import { CONTENT_ACTION_WIDTH } from "@/constants/size.ts";
import { useStores } from '@/hooks';
import { ArrowSlimDownIcon, ArrowSlimUpIcon } from "@/icons";
import { IPeopleDynamicTableData } from "@/interfaces";

export const PeopleDynamicViewTable = observer(() => {
    const { rootStore: { peopleDynamicStore: { tableUsersData: data } } } = useStores();

    const columns = useMemo<ColumnDef<IPeopleDynamicTableData>[]>(() => [
        {
            header: 'Title',
            accessorFn: (row) => row.user.username,
            cell: info => info.getValue(),
            size: 250,
        },
        {
            header: 'Department',
            accessorFn: (row) => row.user.department,
            cell: info => info.getValue(),
            size: 160,
            meta: {
                filterVariant: ETableFilterVariant.SELECT,
            },
            filterFn: (row, columnId, filterValue) => (row.getValue(columnId) || DEFAULT_BLANK_KEY) === filterValue,
        },
        {
            header: 'Activity',
            accessorFn: (row) => row.rate,
            cell: info => {
                const v = info.getValue();
                return Number(v) ? `${Number(v).toFixed(3)} %` : '';
            },
            size: 98,
        },
        {
            header: 'index',
            accessorFn: (row) => row.trend,
            cell: info => {
                const v = info.getValue();
                if(!v) return '';
                const Icon = Number(v) > 0 ? ArrowSlimUpIcon : ArrowSlimDownIcon;
                return (
                    <Stack
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                       <Icon
                           color='inherit'
                           fontSize='small'
                           sx={{
                               stroke: 'inherit'
                       }}
                       />
                    </Stack>
                );
            },
            enableSorting: false,
            size: 46,
        },
    ], []);

    return (
        <Stack maxWidth={CONTENT_ACTION_WIDTH}>
            <Table<IPeopleDynamicTableData>
                data={data}
                columns={columns}
                numCol
                showPagination
                rowStyleOverrides={(row) => ({
                    color: row.original?.fill,
                    '* > svg': {
                        stroke: row.original?.fill,
                    }
                })}
            />
        </Stack>
    );
});
