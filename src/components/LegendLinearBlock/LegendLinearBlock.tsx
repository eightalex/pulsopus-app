import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FC, memo, useMemo } from 'react';

import Typography from '@/components/Typography';
import { activityColors, DEFAULT_INACTIVE_COLOR, DEFAULT_ZERO_COLOR } from "@/constants/activity.ts";

import { ILegendLinearBlockProps } from './types.ts';

const bgColorValidator = (color: string): boolean => Boolean(color);

const LegendLinearBlock: FC<ILegendLinearBlockProps> = (props) => {
    const { options = activityColors } = props;

    const renderOptions = useMemo(() => {
        return [...new Set([DEFAULT_ZERO_COLOR, DEFAULT_INACTIVE_COLOR, ...options.filter(bgColorValidator)])];
    }, [options]);

    return (
        <Stack
            spacing={0}
            width="auto"
        >
            <Stack spacing="1px" direction='row'>
                {Boolean(renderOptions.length) && renderOptions.reverse().map((color) => (
                    <Box
                        key={color}
                        sx={({ spacing }) => ({
                            backgroundColor: color,
                            height: spacing(3),
                            width: spacing(8),
                        })}
                    />
                ))}
            </Stack>
            {renderOptions.length > 1 && (
                <Stack
                    direction="row"
                    justifyContent="space-between"
                >
                    <Typography variant={'caption3'}>Height</Typography>
                    <Typography variant={'caption3'}>Low</Typography>
                </Stack>
            )}
        </Stack>
    );
};

export default memo(LegendLinearBlock);
