import {
	activityColorValuesByMinMax,
	DEFAULT_INACTIVE_COLOR,
	DEFAULT_ZERO_COLOR
} from '@/constants/activity';

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
		min?: number;
		max?: number
	}): string => {
	const {
		zero = DEFAULT_ZERO_COLOR,
		inactive = DEFAULT_INACTIVE_COLOR,
		min = 0,
		max = 100,
	} = options || {};
	if(!activity) return zero;
	const colorValues = activityColorValuesByMinMax(min, max);
	return Object.entries(colorValues).reduce((acc, [value, color]) => {
		const num = Number(value);
		if(!num) return acc;
		if(activity >= num) {
			acc = color;
		}
		return acc;
	}, inactive);
};
