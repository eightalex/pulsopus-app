import { activityColors } from '@/constants/activity';
import Stack from '@mui/material/Stack';
import { memo } from 'react';
import LegendLinearBlock from '@/components/LegendLinearBlock';

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
