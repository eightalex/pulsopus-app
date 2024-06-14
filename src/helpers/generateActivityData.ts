import moment from 'moment';
import { ICalendarRange } from '@/components/Calendar';
import { getActivityRate } from '@/helpers/getActivityRate';
import { IDepartmentActivity, IUserActivity } from '@/interfaces';

export interface IGenerateActivityData {
	diff: number,
	trend: number,
	rate: number
}

type TActivity = { date: number; rate: number } | IUserActivity | IDepartmentActivity;

interface IGenerateActivityDataParams {
	activities?: TActivity[],
	calendarRange?: ICalendarRange
}

/**
 * @deprecated: refactor generate activity data
 * */
export const generateActivityData = (
	{ activities, calendarRange }: IGenerateActivityDataParams
): IGenerateActivityData => {
	const { from, to } = calendarRange || { from: moment(), to: moment() };
	const start = moment(from).startOf('day').valueOf();
	const end = moment(to).endOf('day').valueOf();
	const initActivity = (activities as TActivity[]) || [];
	const activity = initActivity.filter(a => Boolean(a) && Boolean(a.date));

	const currentValues: number[] = activity.filter(a => !!a).reduce((acc, { date, rate }) => {
		const isBetweenOrEq = moment(date).isBetween(start, end, null, '[]');
		if (!isBetweenOrEq) return acc;
		acc.push(rate);
		return acc;
	}, [] as number[]);

	const allRates: number[] = activity.reduce((acc, { rate }) => {
		if (!rate) return acc;
		acc.push(rate);
		return acc;
	}, [] as number[]);

	const { diff, currMedian } = getActivityRate(currentValues, allRates);
	return {
		diff,
		rate: currMedian,
		trend: diff,
	};
};