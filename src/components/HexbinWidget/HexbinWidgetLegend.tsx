import Stack from '@mui/material/Stack';
import { memo } from 'react';

import LegendLinearBlock from '@/components/LegendLinearBlock';
import { activityColors } from '@/constants/activity';

export const HexbinWidgetLegend = memo(() => {
    return (
        <Stack
            sx={({ spacing }) => ({
                alignItems: 'flex-end',
                padding: spacing(0, 9),
            })}
        >
            <LegendLinearBlock options={activityColors}/>
        </Stack>
    );
});
