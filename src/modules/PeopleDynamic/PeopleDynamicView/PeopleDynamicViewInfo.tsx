import Stack from '@mui/material/Stack';
import { FC, memo } from 'react';

import Typography from '@/components/Typography';
import { ArrowDownIcon, ArrowUpIcon } from '@/icons';

interface IPeopleDynamicViewInfoProps {
    title?: string;
    subTitles?: string[];
    values?: { value: number, label: string }[];
    difference: number;
}

const getColorByDiff = (diff: number = 0): string => {
    if (diff === 0) return 'primary';
    return diff > 0 ? 'success' : 'error';
};

/**
 * @deprecated: use RateTrendView component
 * */
export const PeopleDynamicViewInfo: FC<IPeopleDynamicViewInfoProps> = memo((props) => {
    const { title = '', values = [], difference = 0, subTitles = [] } = props;
    const IndexIcon = difference >= 0 ? ArrowUpIcon : ArrowDownIcon;
    const color = getColorByDiff(difference);
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
                <IndexIcon color={color}/>
                {Boolean(values.length) && (
                    <Stack spacing={0}>
                        {values.map(({ value = 0, label = '' }, i, arr) => {
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
                )}
            </Stack>
        </Stack>
    );
});
