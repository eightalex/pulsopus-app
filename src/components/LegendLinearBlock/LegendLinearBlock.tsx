import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FC, memo, useMemo } from 'react';

import {
    EILegendLinearBlockSize,
    EILegendLinearBlockVariant,
    ILegendLinearBlockProps
} from '@/components/LegendLinearBlock/types';
import Typography from '@/components/Typography';

const bgColorValidator = (color: string): boolean => Boolean(color);

const LegendLinearBlock: FC<ILegendLinearBlockProps> = (props) => {
    const { options = [], variant = EILegendLinearBlockVariant.HORIZONTAL, size = EILegendLinearBlockSize.SMALL } = props;

    const renderOptions = useMemo(() => options.filter(bgColorValidator), [options]);

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
