const diffFilling = <T>(length: number, data: T[], creator: (l: number) => T[]): T[] => {
	const diff = length - data.length;
	if (!diff) return data;
	const center = Math.floor(diff / 2);
	const beforeLength = diff - center;
	const afterLength = diff - beforeLength;
	return [...creator(beforeLength), ...data, ...creator(afterLength)];
};

const matrixParamsFill = (row, col, matrix) => {
	const rowCreator = (length) => {
		if (length <= 0) return [];
		return Array(length).fill([...Array(col).fill(null)]);
	};
	// TODO: refactor array methods | complicate
	return diffFilling(row, matrix, rowCreator)
		.map(r => diffFilling(col, r, (l) => Array(l).fill(null)))
		.map((r, i) => {
			if(i % 2 !== 0) return r;
			return [...r, null];
		})
};

export const fillMatrixHexbinChart = <T>(matrix: T[][], w: number, h: number, r: number) => {
	const rowLength = matrix[0]?.length || 0;
	const maxLength = w / r * Math.sqrt(3);
	const hw = r * Math.sqrt(3);
	const width = Math.floor(w / hw);

	const rows = Math.ceil(h / (r * 1.5)) - 1;
	const cols = Math.ceil(w / (r * Math.sqrt(3))) - 1; // -2

	return {
		matrix: matrixParamsFill(rows, cols, matrix),
		width,
		r,
	};
};
