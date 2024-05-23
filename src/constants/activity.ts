type TActivityColorValues = Record<number, string>;

export const MIN_ACTIVITY_VALUE = 0;
export const MAX_ACTIVITY_VALUE = 100;

export const DEFAULT_INACTIVE_COLOR = '#1C1C1C';
export const DEFAULT_ZERO_COLOR = '#c1ffdb';

export const activityColors = ['#53DE99', '#22AE67', '#116C36'];

export const activityColorValues: TActivityColorValues = activityColors.reduce((acc, color, i) => {
	const stepValue = (MAX_ACTIVITY_VALUE - MIN_ACTIVITY_VALUE) / activityColors.length;
	acc[stepValue * i + 1] = color;
	return acc;
}, {} as TActivityColorValues);
