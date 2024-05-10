export const getMedianValue = (arr: number[]): number => {
	return arr.reduce((acc, rate) => {
		acc = acc + rate || 0;
		return acc;
	}, 0) / arr.length || 1;
};