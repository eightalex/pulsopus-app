import {getRangePeriod} from '@/components/CalendarRangePicker/helpers';
import {PeriodItemStyled} from '@/components/CalendarRangePicker/styled';
import {ICalendarRangePickerViewProps} from '@/components/CalendarRangePicker/types';
import Stack from '@mui/material/Stack';
import {FC, useCallback} from 'react';
import {EPeriodTypes, periodList} from '../constants';

interface ICalendarRangePickerViewPeriodsProps extends ICalendarRangePickerViewProps {
	offset?: number;
}

export const CalendarRangePickerViewPeriods: FC<ICalendarRangePickerViewPeriodsProps> = (props) => {
	const {
		onSetPeriod,
		onSetRange,
		period,
		offset,
	} = props;

	const handleClickRange = useCallback((period: EPeriodTypes) => {
		onSetPeriod?.(period || EPeriodTypes.CUSTOM);
		if(!period) return;
		onSetRange?.(getRangePeriod(period));
	}, [onSetPeriod, onSetRange]);

	return (
		<Stack
			spacing={0}
			sx={({ extendPalette, spacing }) => ({
				width: 'auto',
				height: 'auto',
				flexGrow: 1,
				padding: spacing(3, 0),
				boxSizing: 'border-box',
				borderRight: `1px solid ${extendPalette.calendarSurfaceSecondary}`,
				opacity: offset ? 1 : 0,
			})}
		>
			<Stack
				spacing={2}
				sx={{
					width: 'auto',
					height: 'auto',
					paddingTop: `${offset}px`,
				}}
			>
				{periodList.map(({ label, value }) => (
					<PeriodItemStyled
						key={`${label}-${value}`}
						onClick={() => handleClickRange(value)}
						active={value === period}
					>
						{label}
					</PeriodItemStyled>
				))}
			</Stack>
		</Stack>
	);
};
