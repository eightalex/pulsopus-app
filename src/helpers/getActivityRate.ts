import { getMedianValue } from '@/helpers/getMedianValue';

export const getActivityRate = (currentValues: number[], prevValues: number[]): {
	currMedian: number;
	prevMedian: number;
	diff: number;
	index: boolean;
} => {
	const formatter = (num: number) => Math.round(100 * num) / 100;
	const currMedian = getMedianValue(currentValues);
	const prevMedian = getMedianValue(prevValues);
	return {
		currMedian: formatter(currMedian),
		prevMedian: formatter(prevMedian),
		diff: formatter(currMedian - prevMedian),
		index: currMedian > prevMedian,
	};
};
