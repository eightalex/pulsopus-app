import Stack from "@mui/material/Stack";
import { SortDirection } from "@tanstack/table-core";
import { FC, useCallback, useLayoutEffect, useMemo, useRef } from "react";

import { ArrowSlimDownIcon, ArrowSlimUpIcon, ISvgIcon } from '@/icons';
import { createSvgIcon } from "@/icons/utils/createSvgIcon.tsx";

import { ITableHeadCellSortProps } from "../types.ts";

const renderSortDirection: Record<SortDirection, ReturnType<typeof createSvgIcon>> = {
    asc: ArrowSlimUpIcon,
    desc: ArrowSlimDownIcon,
};

const iconProps: ISvgIcon = {
    fontSize: 'extraSmall',
    color: 'secondary',
    stroke: '#d0d0d0',
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
                <Icon key={k} {...iconProps}/>
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
    const sortDirectionRef = useRef<HTMLDivElement>(null);
    const isOverflowRef = useRef(false);

    const icon = useMemo(() => {
        if(!sortDirection) return null;
        const Icon = renderSortDirection[sortDirection];
        return <Icon {...iconProps} />;
    }, [sortDirection]);

    const sortStyleOverrideByVisible = useMemo(() => {
        // if(!isOverflowRef.current || icon || !showSortDefaultView || sortDirection) return {};
        if(!isOverflowRef.current) return {};
        return {
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: `translate(${sortDirection ? '0px' : '-4px'}, -50%)`,
            marginInlineStart: 0,
        };
    }, [sortDirection]);

    const computeScrollParent = useCallback(() => {
        if(!sortDirectionRef.current) return;
        const element = sortDirectionRef.current;
        const parent = element.parentElement;
        if(!parent) return;
        const hasHorizontalParentScroll = parent.scrollWidth > parent.clientWidth;

        if(!isOverflowRef.current && hasHorizontalParentScroll) {
            isOverflowRef.current = hasHorizontalParentScroll;
        }

        const computedStyles = getComputedStyle(element);
        const shouldHide = !sortDirection && showSortDefaultView && computedStyles.position === 'absolute';

        parent.style.padding = isOverflowRef.current && sortDirection ? '12px 10px 12px 6px' : '12px 10px';
        for (const child of parent.children) {
            (child as HTMLElement).style.opacity = shouldHide ? '0.1' : '1';
        }
        element.style.opacity = '1';
    }, [showSortDefaultView, sortDirection]);

    useLayoutEffect(() => {
        computeScrollParent();
    }, [computeScrollParent]);

    if(disableSortView) {
        return '';
    }

    return (
        <Stack
            component='div'
            ref={sortDirectionRef}
            direction='row'
            sx={{
                alignItems: 'center',
                ...sortStyleOverrideByVisible,
            }}
        >
            {icon
                ? icon
                : <DefaultIconView show={showSortDefaultView}/>
            }
        </Stack>
    );
};