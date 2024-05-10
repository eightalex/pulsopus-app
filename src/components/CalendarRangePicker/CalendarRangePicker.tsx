import { getRangePeriod } from '@/components/CalendarRangePicker/helpers';
import {Box, Stack} from '@mui/material';
import moment from 'moment';
import {FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import { CalendarRangePickerDropdown } from './CalendarRangePickerDropdown';
import { CalendarRangePickerLabel } from './CalendarRangePickerLabel';
import { CalendarRangePickerView } from './CalendarRangePickerView/CalendarRangePickerView';
import { EPeriodTypes, periodList } from './constants';
import { ICalendarRange, ICalendarRangePickerProps } from './types';

const CalendarRangePicker: FC<ICalendarRangePickerProps> = (props) => {
	const {
		onChange,
		range: { from: rangeFrom, to: rangeTo } = {},
	} = props;
	const [from, setFrom] = useState(rangeFrom);
	const [to, setTo] = useState(rangeTo);
	const targetRef = useRef<HTMLDivElement>();
	const [isViewCalendar, setIsViewCalendar] = useState<boolean>(false);
	const [period, setPeriod] = useState<EPeriodTypes>(periodList[0].value);

	const handleChange = useCallback((range: ICalendarRange) => {
		range.from && setFrom(range.from);
		range.to && setTo(range.to);
		if(range.from && range.to) {
			onChange?.(range);
		}
	}, [onChange]);

	const onSetPeriod = useCallback((nextPeriod: EPeriodTypes) => {
		if (period === nextPeriod) return;
		setPeriod(nextPeriod);
	}, [period]);

	const handleClose = useCallback(() => {
		const vls = [from || rangeFrom, to || rangeTo || from || rangeFrom].filter(t => !!t);
		if(vls.length) {
			const [f, t] = vls;
			if(f !== rangeFrom || t !== rangeTo) {
				handleChange({ from: f, to: t });
			}
		}
		setIsViewCalendar(prev => !prev);
	}, [from, rangeFrom, to, rangeTo, handleChange]);

	const updatePeriodValue = useCallback(() => {
		let newPeriod = EPeriodTypes.CUSTOM;
		periodList.forEach(({value}) => {
			const periodRange = getRangePeriod(value);
			if (!periodRange) return;
			const {from: periodFrom = 0, to: periodTo = 0} = periodRange;
			const getMoment = (t: number): number => moment(t).startOf('day').valueOf();
			const sFrom = getMoment(rangeFrom || 0);
			const sTo = getMoment(rangeTo || 0);
			const mFrom = getMoment(periodFrom);
			const mTo = getMoment(periodTo);
			if (sFrom !== mFrom || sTo !== mTo) return;
			newPeriod = value;
		});
		setPeriod(newPeriod);
	}, [rangeFrom, rangeTo]);

	useEffect(() => {
		updatePeriodValue();
	}, [updatePeriodValue]);

	useEffect(() => {
		if (!rangeFrom && !rangeTo) {
			const { from: initFrom, to: initTo } = getRangePeriod(EPeriodTypes.MONTH_1)
			handleChange({ from: initFrom, to: initTo });
		}
	}, []);

	useEffect(() => {
		if((rangeFrom && rangeFrom !== from) || (rangeTo && rangeTo !== to)) {
			handleChange({from: rangeFrom, to: rangeTo});
		}
	}, [rangeFrom, rangeTo, handleChange, from, to]);

	return (
		<Stack direction="row" position={'relative'}>
			<Box ref={targetRef} sx={{height: 'fit-content'}}>
				<CalendarRangePickerLabel
					onClick={() => setIsViewCalendar(true)}
					from={from}
					to={to}
				/>
			</Box>
			{isViewCalendar && (
				<CalendarRangePickerDropdown
					onClose={handleClose}
					targetRef={targetRef}
				>
					<CalendarRangePickerView
						period={period}
						onClose={handleClose}
						onSetRange={handleChange}
						onSetPeriod={onSetPeriod}
						from={from}
						to={to}
					/>
				</CalendarRangePickerDropdown>
			)}
		</Stack>
	);
};

export default memo(CalendarRangePicker);
