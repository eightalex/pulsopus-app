import { Stack } from '@mui/material';
import { ColumnDef } from "@tanstack/react-table";
import * as d3 from "d3";
import { observer } from 'mobx-react';
import { useMemo } from "react";

import { IHexbinChartMatrixParam } from "@/components/Chart/HexbinChart";
import Table, { ETableFilterVariant } from "@/components/Table";
import { DEFAULT_BLANK_KEY } from "@/components/Table/TableSelect";
import { CONTENT_ACTION_WIDTH } from "@/constants/size.ts";
import { useHexbinWidgetData, useStores } from '@/hooks';
import { IUser } from "@/interfaces";

export const PeopleDynamicViewTable = observer(() => {
    const { rootStore: { peopleDynamicStore: { hexbinUsersData } } } = useStores();
    const data = useHexbinWidgetData(hexbinUsersData);
    console.log('data', data);
    const d = data
        .flatMap(d => d)
        .filter(d => !!d && !!d.data)
        .sort((a, b) => a.value - b.value);
    console.log('d', d);
    return;
    const [vMin, vMax] = d3.extent(d, (r) => r.data.activity[0].value);
    const half = (Number(vMax) - Number(vMin)) / 2;

    const columns = useMemo<ColumnDef<IHexbinChartMatrixParam<IUser>>[]>(() => [
        {
            header: 'Title',
            accessorFn: (row) => row.data.username,
            cell: info => info.getValue(),
            size: 250,
        },
        {
            header: 'Department',
            accessorFn: (row) => row.data.department?.label,
            cell: info => info.getValue(),
            size: 240,
            meta: {
                filterVariant: ETableFilterVariant.SELECT,
            },
            filterFn: (row, columnId, filterValue) => (row.getValue(columnId) || DEFAULT_BLANK_KEY) === filterValue,
        },
        {
            header: '% activity',
            accessorFn: (row) => row.value,
            cell: info => {
                const v = info.getValue();
                return Math.round(Number(v));
            },
            size: 160,
        },
        {
            header: 'index',
            accessorFn: (row) => row.data.activity[0].value,
            cell: info => {
                const v = Number(info.getValue());
                return v < half ? '-' : '+';
            },
            size: 68,
        },
    ], [half]);

    return (
        <Stack maxWidth={CONTENT_ACTION_WIDTH}>
            <Table<{ fill: string, data: IUser }>
                data={d}
                columns={columns}
                numCol
                showPagination
                rowStyleOverrides={(row) => ({
                    color: row.original?.fill,
                })}
            />
        </Stack>
    );
});
