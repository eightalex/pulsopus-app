/* eslint-disabled */
import { createMatrixFromArray } from './createMatrixFromArray';

export const DEFAULT_STATUS = 0;

const diffFilling = <T>(length: number, data: T[], creator: (l: number) => T[]): T[] => {
	const diff = length - data.length;
	if(!diff) return data;
	const center = Math.floor(diff / 2);
	const beforeLength = diff - center;
	const afterLength = diff - beforeLength;
	return [...creator(beforeLength), ...data, ...creator(afterLength)];
};

const matrixParamsFill = (row, col, matrix) => {
	const rowCreator = (length) => {
		if(length <= 0) return [];
		return Array(length).fill([...Array(col).fill(DEFAULT_STATUS)]);
	};
	return diffFilling(row, matrix, rowCreator).map(r => diffFilling(col, r, (l) => Array(l).fill(DEFAULT_STATUS)));
};

export const sorting = (matrix) => {
	const sorted = (data) => {
		const elmsMap = data.reduce((acc, n) => {
			let c = acc.get(n) || 0;
			acc.set(n, ++c);
			return acc;
		}, new Map());

		const sortedKeys = Array.from(elmsMap.keys()).sort((a, b) => b - a);
		const sortedMap = new Map();
		for (const key of sortedKeys) {
			sortedMap.set(key, elmsMap.get(key));
		}

		let left = [];
		let right = [];
		[...sortedMap.entries()].forEach(([k, v], i) => {
			const cIdx = Math.floor(v / 2);

			left = [
				...left,
				...new Array(v - cIdx).fill(Number(k))
			];
			right = [
				...right,
				...new Array(v - (v - cIdx)).fill(Number(k))
			];
		});

		return [...left.reverse(), ...right];
	};
	return matrix.map(r => sorted(r));
};

/**
 * @deprecated: refactor hexbin chart
 * */
export const generateMatrixData = (rows, col, data) => {
	return createMatrixFromArray(data);
	// TODO: refactor and remove
	// const matrix = createMatrixFromArray(data);
	// const result = matrixParamsFill(rows, col, matrix);
	// return result;
};
