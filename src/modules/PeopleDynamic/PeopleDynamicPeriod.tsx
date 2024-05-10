import Typography from '@/components/Typography';
import Stack from '@mui/material/Stack';
import { FC, memo } from 'react';

interface IPeopleDynamicPeriodProps {
	isInlineView?: boolean;
}

export const PeopleDynamicPeriod:FC<IPeopleDynamicPeriodProps> = memo(({ isInlineView = false }) => {
	return (
		<Stack
			direction={isInlineView ? 'row' : 'column'}
			spacing={isInlineView ? 5 : 1}
			alignItems={isInlineView ? 'center' : 'unset'}
		>
			<Typography
				variant="body2"
				textTransform="uppercase"
			>
				Selected period
			</Typography>
			<Typography variant="text">01.01.2022-01.02.2022</Typography>
		</Stack>
	);
});
