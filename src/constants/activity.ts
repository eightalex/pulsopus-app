type TActivityColorValues = Record<number, string>;

export const MIN_ACTIVITY_VALUE = 0;
export const MAX_ACTIVITY_VALUE = 100;

// export const DEFAULT_INACTIVE_COLOR = '#1C1C1C'; // OLD
export const DEFAULT_INACTIVE_COLOR = '#7FEBAE';

// export const DEFAULT_ZERO_COLOR = '#494949'; // OLD - default hex color
export const DEFAULT_ZERO_COLOR = '#A7F2C6';


export const activityColors = ['#53DE99', '#22AE67', '#116C36'];

export function activityColorValuesByMinMax(
	min: number = MIN_ACTIVITY_VALUE,
	max: number = MAX_ACTIVITY_VALUE
): TActivityColorValues {
	return activityColors.reduce((acc, color, i) => {
		const stepValue = (max - min) / activityColors.length;
		acc[stepValue * i + 1] = color;
		return acc;
	}, {} as TActivityColorValues);
}

export const activityColorValues = activityColorValuesByMinMax();
