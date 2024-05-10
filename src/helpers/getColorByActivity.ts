import { activityColorValues, DEFAULT_INACTIVE_COLOR } from '@/constants/activity';

export const getColorByActivity = (activity: number): string => {
	return Object.entries(activityColorValues).reduce((acc, [value, color]) => {
		const num = Number(value);
		if(!num) return acc;
		if(activity >= num) {
			acc = color;
		}
		return acc;
	}, DEFAULT_INACTIVE_COLOR);
};
