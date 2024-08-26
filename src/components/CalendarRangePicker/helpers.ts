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
	const defaultRange = { from: 0, to: 0 };
	if(!period || period === EPeriodTypes.CUSTOM) return defaultRange;
	const p = `${period}` as string;
	const [periodFrom, periodTo] = p.split(PERIOD_RANGE_SEPARATOR);
	if(!periodFrom || !periodTo) return defaultRange;
	const [unitFrom, diffFrom = 0] = periodFrom.split(PERIOD_VALUES_SEPARATOR) as [unitOfTime.Base, number];
	const [unitTo, diffTo = 0] = periodTo.split(PERIOD_VALUES_SEPARATOR) as [unitOfTime.Base, number];
	if(!unitFrom || !unitTo) return defaultRange;

	const DAY_UNIT = 'day';
	const WEEK_UNIT = 'week';
	const ISO_WEEK_UNIT = 'isoWeek';
	const unitStartOf = (unit: string) => [WEEK_UNIT].includes(unit) ? ISO_WEEK_UNIT : DAY_UNIT;

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
	return Object.values(EPeriodTypes).reduce((acc, period) => {
		const { from, to } = getRangeFromPeriod(period);
		const isEqFrom = moment(from).startOf('d').isSame(moment(range.from).startOf('d').valueOf());
		const isEqTo = moment(to).endOf('d').isSame(moment(range.to).endOf('d').valueOf());
		if(!isEqFrom || !isEqTo) return acc;
		return period;
	}, EPeriodTypes.CUSTOM);
};

