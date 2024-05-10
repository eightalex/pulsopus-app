import {
	CalendarNext2Icon,
	CalendarNextIcon,
	CalendarPrev2Icon,
	CalendarPrevIcon
} from '@/components/Calendar/CalendarNavIcons';
import { findAndRoundedActiveElements, getHoveredElementsValue } from '@/components/Calendar/helpers';
import { ICalendarProps } from '@/components/Calendar/types';
import Typography from '@/components/Typography';
import { useEventListener } from '@/hooks';
import { Stack } from '@mui/material';
import moment from 'moment';
import { FC, memo, MouseEvent, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.scss';

// TODO: remove .scss | create mui styled for calendar
const Calendar: FC<ICalendarProps> = (props) => {
	const { onChange, value, onActiveStartDateChange, onClickDay, onHoveredDays: onHoveredDays, ...restProps } = props;
	const calendarRef = useRef<HTMLDivElement>();
	const inputRef = useRef<HTMLDivElement>();
	const [activeStartValue, setActiveStartValue] = useState<Date | null>(value?.[0] || value);
	const [isStartedRange, setIsStartedRange] = useState(false);

	const currentValue = useMemo(() => {
		const isArr = Array.isArray(value);
		if (isArr && !value.length) {
			return moment().toDate();
		}
		if (isArr && value.length <= 1) {
			const v = moment(value[0]).toDate();
			return [v, v];
		}
		return value;
	}, [value]);

	const getHoveredValues = useCallback(() => {
		if (!inputRef || !inputRef.current) return;
		const wrapper = inputRef.current;
		const day = getHoveredElementsValue(wrapper);
		if(!day) return;
		if (!isStartedRange) {
			onHoveredDays?.([day, null]);
			return;
		}
		const values = [activeStartValue, day]
		.filter(d => !!d && moment(d).isValid())
		.sort((p, n) => moment(p).valueOf() - moment(n).valueOf())
		onHoveredDays?.(values);
	}, [isStartedRange, onHoveredDays, activeStartValue]);

	const updateElements = useCallback(() => {
		if (!inputRef || !inputRef.current) return;
		const wrapper = inputRef.current;
		findAndRoundedActiveElements(wrapper);
		getHoveredValues();
	}, [inputRef, getHoveredValues]);

	useEventListener('mousemove', updateElements, inputRef as RefObject<HTMLDivElement>, true);

	useEventListener('mouseout', () => onHoveredDays?.([]), inputRef as RefObject<HTMLDivElement>, true);

	useEffect(() => {
		updateElements();
	}, [updateElements]);

	useEffect(() => {
		setActiveStartValue(value[0]);
	}, [value]);

	return (
		<ReactCalendar
			ref={calendarRef}
			inputRef={inputRef}
			className="calendar"
			value={currentValue}
			defaultValue={currentValue}
			defaultActiveStartDate={currentValue[0]}
			activeStartDate={activeStartValue}
			allowPartialRange
			goToRangeStartOnSelect
			showNavigation
			showDoubleView={false}
			showNeighboringMonth
			showNeighboringCentury
			selectRange
			returnValue="range"
			locale={'en-EN'}
			defaultView="month"
			minDetail="decade"
			dayAriaLabel="Day"
			monthAriaLabel="Month"
			// maxDate={moment().endOf('year').toDate()}
			// onDrillUp={console.log}
			// onDrillDow={console.log}
			// onClickDay={console.log}
			// onViewChange={console.log}
			onActiveStartDateChange={(args) => {
				updateElements();
				onActiveStartDateChange?.(args);
				setActiveStartValue(null);
			}}
			onClickDay={(value: Date, event: MouseEvent<HTMLButtonElement>) => {
				setIsStartedRange(prev => !prev);
				onClickDay?.(value, event);
			}}
			onChange={(params) => {
				updateElements();
				onChange?.(params);
			}}
			formatShortWeekday={(_, date) =>
				moment(date)
					.format('dd')
					.toString()
					.split('')[0]
			}
			formatMonth={(_, date) => moment(date).format('MMM')}
			// formatMonthYear={(_, date) => moment(date).format('MMM YYYY')}
			prevAriaLabel="prev-month"
			nextAriaLabel="next-month"
			prev2AriaLabel="prev-year"
			next2AriaLabel="next-year"
			prevLabel={<CalendarPrevIcon/>}
			prev2Label={<CalendarPrev2Icon/>}
			nextLabel={<CalendarNextIcon/>}
			next2Label={<CalendarNext2Icon/>}
			navigationLabel={({ label }) => (
				<Stack
					direction="row"
					spacing={1}
					alignItems="center"
				>
					{label.split(' ').map((t) => (
						<Typography
							key={t}
							variant="text"
							fontSize={15}
							textTransform="uppercase"
						>
							{t}
						</Typography>
					))}
				</Stack>
			)}
			{...restProps}
		/>
	);
};

export default memo(Calendar);
