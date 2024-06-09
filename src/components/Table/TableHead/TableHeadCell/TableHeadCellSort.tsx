import Stack from "@mui/material/Stack";
import { SortDirection } from "@tanstack/table-core";
import { FC, useMemo } from "react";

import { ArrowSlimDownIcon, ArrowSlimUpIcon } from '@/icons';
import { createSvgIcon } from "@/icons/utils/createSvgIcon.tsx";

import { ITableHeadCellSortProps } from "./types.ts";

const renderSortDirection: Record<SortDirection, ReturnType<typeof createSvgIcon>> = {
    asc: ArrowSlimUpIcon,
    desc: ArrowSlimDownIcon,
};

const DefaultIconView = ({ show = false }: { show?: boolean }) => {
    return (
        <Stack
            direction='row'
            alignItems='center'
            spacing={0}
            sx={{
                opacity: show ? 1 : 0
            }}
        >
            {Object.entries(renderSortDirection).map(([k, Icon]) => (
                <Icon key={k} fontSize='extraSmall' color='secondary'/>
            ))}
        </Stack>
    );
};

export const TableHeadCellSort: FC<ITableHeadCellSortProps> = (props) => {
    const {
        sortDirection,
        showSortDefaultView,
        disableSortView = false,
    } = props;

    const icon = useMemo(() => {
        if(!sortDirection) return null;
        const Icon = renderSortDirection[sortDirection];
        return <Icon fontSize='extraSmall' color='secondary'/>;
    }, [sortDirection]);

    if(disableSortView) {
        return '';
    }

    if(!icon) {
        return <DefaultIconView show={showSortDefaultView}/>;
    }

    return (
        <Stack
            direction='row'
            alignItems='center'
        >
            {Boolean(sortDirection) && icon}
        </Stack>
    );
};