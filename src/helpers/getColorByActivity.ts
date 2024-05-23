import { activityColorValues, DEFAULT_INACTIVE_COLOR, DEFAULT_ZERO_COLOR } from '@/constants/activity';

export const getColorByActivity = (activity: number): string => {
	if(!activity) return DEFAULT_ZERO_COLOR;
	return Object.entries(activityColorValues).reduce((acc, [value, color]) => {
		const num = Number(value);
		if(!num) return acc;
		if(activity >= num) {
			acc = color;
		}
		return acc;
	}, DEFAULT_INACTIVE_COLOR);
};
