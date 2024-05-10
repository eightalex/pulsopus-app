export const isMatrix = <T extends Array<unknown>>(array: T): boolean => {
	if (!Array.isArray(array) || array.length === 0 || !Array.isArray(array[0])) {
		return false;
	}
	const rowLength = array[0].length;
	return array.every(row => Array.isArray(row) && row.length === rowLength);
};