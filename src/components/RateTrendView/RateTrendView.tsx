import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from "@mui/material/Stack";
import { FC, ReactNode, useMemo, useRef, useState } from "react";

import Typography, { TTypographyColorType } from "@/components/Typography";
import { ArrowDownIcon, ArrowUpIcon, ISvgIcon } from "@/icons";

interface ITooltipParam {
    value?: string | number;
    label?: string;
}

interface IRateTrandViewProps {
    title?: string;
    children?: ReactNode;
    subTitles?: string[];
    rate?: number;
    trend?: number;
    hideRate?: boolean;
    hideTrend?: boolean;
    tooltips?: Array<ITooltipParam | null>;
}

const getColorByTrend = (trend = 0): TTypographyColorType => {
    const res = trend === 0
        ? 'primary'
        : trend > 0 ? 'success' : 'error';
    return res as TTypographyColorType;
};

export const RateTrendView: FC<IRateTrandViewProps> = (props) => {
    const {
        title = '',
        children,
        subTitles = [],
        rate = 0,
        trend = 0,
        hideRate = false,
        hideTrend = false,
        tooltips = [],
    } = props;
    const menuAnchorRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const IndexIcon = trend > 0 ? ArrowUpIcon : ArrowDownIcon;
    const color = getColorByTrend(trend);
    const renderValues = useMemo(() => {
        const res = [];
        if(!hideTrend) {
            res.push({ value: trend, label: 'Growth Trend' });
        }
        if(!hideRate) {
            res.push({ value: rate, label: 'Activity Rate' });
        }
        return res;
    }, [trend, rate, hideTrend, hideRate]);

    const renderTooltips: ITooltipParam[][] = useMemo(() => {
        let j = 0;
        return tooltips.reduce((acc, t = {}) => {
            const hasData = [t?.value, t?.label].some(v => typeof v !== 'undefined');
            if(!t || !hasData) {
                j++;
                return acc;
            }
            const ts = acc[j] || [];
            ts.push(t);
            acc[j] = ts;
            return acc;
        }, [] as ITooltipParam[][]);
    }, [tooltips]);

    return (
        <Stack
            spacing={4}
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Stack spacing={0}>
                {Boolean(title) && (
                    <Typography
                        variant="subtitle"
                        textTransform="uppercase"
                        color={color}
                    >
                        {title}
                    </Typography>
                )}
                {Boolean(children) && children}
                <Stack spacing={0.5}>
                    {subTitles.map((subtitle = '', i) => (
                        <Typography
                            key={`${i}-${subtitle}`}
                            variant="body2"
                            color={color}
                        >
                            {subtitle}
                        </Typography>
                    ))}
                </Stack>
            </Stack>
            <Stack
                spacing={1}
                alignItems="center"
                direction="row"
                position={'relative'}
                ref={menuAnchorRef}
            >
                {Boolean(trend) && (!hideTrend || !hideRate) && <IndexIcon color={color as ISvgIcon['color']}/>}
                <Stack spacing={0}>
                    {renderValues.map(({ value = 0, label = '' }, i, arr) => {
                        const digFormat = Math.abs(Math.round(value)).toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        });
                        const wrapAlignItems = arr.length - 1 === i ? 'flex-end' : 'center';
                        return (
                            <Stack
                                key={`${i}-${label}-${value}`}
                                spacing={2}
                                direction="row"
                                alignItems={i ? wrapAlignItems : 'unset'}
                            >
                                <Typography
                                    variant="subtitle"
                                    color={color}
                                >
                                    {digFormat}%
                                </Typography>
                                <Typography
                                    color={color}
                                    variant="body1"
                                    lineHeight={1.7}
                                >
                                    {label}
                                </Typography>
                            </Stack>
                        );
                    })}
                </Stack>

                {Boolean(hovered) && Boolean(renderTooltips.length) && (
                    <Menu
                        anchorEl={menuAnchorRef.current}
                        open={hovered}
                        onClose={() => setHovered(false)}
                    >
                        <MenuItem>
                            <Stack spacing={2} width='100%'>
                                {renderTooltips.map((list, index) => (
                                    <Stack key={index} spacing={0}>
                                        {list.map((el, listIndex) => {
                                            const { label, value } = el || {};
                                            const textProps = {
                                                variant: 'text',
                                                fontSize: 14,
                                                lineHeight: 1,
                                            };
                                            return (
                                                <Stack
                                                    key={`${index}-${listIndex}`}
                                                    direction='row'
                                                    justifyContent='space-between'
                                                    flexGrow={1}
                                                    spacing={1}
                                                >
                                                    {[label, value].map((v, infoIndex) => (
                                                        <Typography
                                                            key={`${v}-${infoIndex}`}
                                                            {...textProps}
                                                        >
                                                            {v}
                                                        </Typography>
                                                    ))}
                                                </Stack>
                                            );
                                        })}
                                    </Stack>
                                ))}
                            </Stack>
                        </MenuItem>
                    </Menu>
                )}
            </Stack>
        </Stack>
    );
};