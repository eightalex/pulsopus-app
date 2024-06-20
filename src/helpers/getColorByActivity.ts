import { activityColorValues, DEFAULT_INACTIVE_COLOR, DEFAULT_ZERO_COLOR } from '@/constants/activity';

/**
 * @param activity {number} activity value in percent (min:0 max:100).
 * @param options {} activity options
 * @param options.zero {string} activity zero color or default
 * @param options.inactive {string} activity inactive color
 * */
export const getColorByActivity = (
	activity: number,
	options?: {
		zero?: string;
		inactive?: string;
		active?: string[];
	}): string => {
	const {
		zero = DEFAULT_ZERO_COLOR,
		inactive = DEFAULT_INACTIVE_COLOR,
	} = options || {};
	if(!activity) return zero;
	return Object.entries(activityColorValues).reduce((acc, [value, color]) => {
		const num = Number(value);
		if(!num) return acc;
		if(activity >= num) {
			acc = color;
		}
		return acc;
	}, inactive);
};
