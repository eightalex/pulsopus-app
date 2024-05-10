import Typography from '@/components/Typography';
import { CalendarPlusIcon } from '@/icons';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import moment from 'moment';
import { FC, useCallback, useMemo } from 'react';
import { dateFormatFull } from './helpers';
import { RangeLabelContainerStyled } from './styled';
import { ICalendarRangePickerLabelProps } from './types';

export const CalendarRangePickerLabel: FC<ICalendarRangePickerLabelProps> = ({ onClick, from, to }) => {
	const isRenderTitle = useMemo(() => moment(from).isValid() || moment(to).isValid(), [from, to]);

	const handleClick = useCallback(async () => {
		onClick?.();
	}, [onClick]);

	return (
		<RangeLabelContainerStyled
			onClick={handleClick}
			fullLine={isRenderTitle}
		>
			<CalendarPlusIcon sx={{ transform: 'translateY(-2px)' }}/>
			<Collapse in={isRenderTitle}>
				{isRenderTitle && (
					<Stack
						direction="row"
						spacing={1}
						marginLeft={3}
					>
						<Collapse
							in={isRenderTitle}
							orientation="horizontal"
						>
							<Typography variant="text">
								{dateFormatFull(from)}
							</Typography>
						</Collapse>
						{Boolean(to || from) && (
							<>
								<Typography variant="text">-</Typography>
								<Typography variant="text">
									{dateFormatFull(to || from)}
								</Typography>
							</>
						)}
					</Stack>
				)}
			</Collapse>
		</RangeLabelContainerStyled>
	);
};
