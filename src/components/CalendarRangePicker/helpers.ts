import moment, { unitOfTime } from 'moment';
import {
	EPeriodTypes,
	PERIOD_RANGE_SEPARATOR,
	PERIOD_VALUES_SEPARATOR
} from '@/components/CalendarRangePicker/constants';
import { ICalendarRange } from '@/components/CalendarRangePicker/types';

export const dateFormat = (date: number | undefined, format: string) => date && moment(date).format(format);

export const dateFormatFull = (date: number | undefined) => dateFormat(date, 'll');

export const getRangeFromPeriod = (period: EPeriodTypes): ICalendarRange => {
	if(!period) return;
	const p = `${period}` as string;
	const [periodFrom, periodTo] = p.split(PERIOD_RANGE_SEPARATOR);
	if(!periodFrom || !periodTo) return;
	const [unitFrom, diffFrom = 0] = periodFrom.split(PERIOD_VALUES_SEPARATOR) as [unitOfTime.Base, number];
	const [unitTo, diffTo = 0] = periodTo.split(PERIOD_VALUES_SEPARATOR) as [unitOfTime.Base, number];
	if(!unitFrom || !unitTo) return;

	const DAY_UNIT = 'day';
	const WEEK_UNIT = 'week';
	const ISO_WEEK_UNIT = 'isoWeek';
	const unitStartOf = (unit) => [WEEK_UNIT].includes(unit) ? ISO_WEEK_UNIT : DAY_UNIT;

	const from = moment()
		.startOf(unitStartOf(unitFrom))
		.subtract(diffFrom, unitFrom)
		.valueOf();
	const to = moment()
		.endOf(unitStartOf(unitTo))
		.subtract(diffTo, unitTo)
		.valueOf();
	return { from, to };
};

export const getPeriodFromRange = (range: ICalendarRange): EPeriodTypes => {
	// console.log('Object.entries(EPeriodTypes)', Object.entries(EPeriodTypes));
	return EPeriodTypes.CUSTOM;
};

