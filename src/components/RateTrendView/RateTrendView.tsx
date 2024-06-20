import Stack from "@mui/material/Stack";
import { FC, ReactNode, useMemo } from "react";

import Typography from "@/components/Typography";
import { ArrowDownIcon, ArrowUpIcon } from "@/icons";

interface IRateTrandViewProps {
    title?: string;
    children?: ReactNode;
    subTitles?: string[];
    rate?: number;
    trend?: number;
    hideRate?: boolean;
    hideTrend?: boolean;
}

const getColorByTrend = (trend = 0): string => {
    if (trend === 0) return 'primary';
    return trend > 0 ? 'success' : 'error';
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
    } = props;
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
    return (
        <Stack spacing={4}>
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
            >
                {Boolean(trend) && (!hideTrend || !hideRate) && <IndexIcon color={color}/>}
                <Stack spacing={0}>
                    {renderValues.map(({ value = 0, label = '' }, i, arr) => {
                        const digFormat = Math.abs(Math.floor(value)).toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        });
                        const wrapAlignItems = arr.length - 1 === i ? 'flex-end' : 'center';
                        return (
                            <Stack
                                key={`${i}-${label}-${value}`}
                                spacing={2}
                                direction="row"
                                alignItems={i && wrapAlignItems}
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
            </Stack>
        </Stack>
    );
};