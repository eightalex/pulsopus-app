const sortingArray = <T extends number>(arr: T[]): T[] => {
	return arr.sort((a, b) => a - b);
};

enum DIRECTION {
	RIGHT,
	DOWN,
	LEFT,
	UP
}

export const createMatrixFromArray = <T extends number>(arr: T[]) => {
	if(!arr || !arr.length) {
		throw new Error('Unexpected params exception!');
	}

	const rows = Math.ceil(Math.sqrt(arr.length));
	const cols = Math.ceil(arr.length / rows);

	arr = sortingArray<T>(arr);

	const diffArr = Array((rows * cols) - arr.length).fill(null);
	const inputData = [...diffArr, ...arr];

	const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));

	let x = 0;
	let y = 0;
	let top = 0;
	let left = 0;
	let right = cols - 1;
	let bottom = rows - 1;
	let direction = DIRECTION.RIGHT;

	for(const value of inputData) {
		matrix[x][y] = value;

		switch (direction) {
			case DIRECTION.RIGHT:
				if (y < right) {
					y++;
				} else {
					right--;
					top++;
					x++;
					direction = DIRECTION.DOWN;
				}
				break;
			case DIRECTION.DOWN:
				if(x < bottom) {
					x++;
				} else {
					y--;
					bottom--;
					direction = DIRECTION.LEFT;
				}
				break;
			case DIRECTION.LEFT:
				if(y > left) {
					y--;
				} else {
					left++;
					x--;
					direction = DIRECTION.UP;
				}
				break;
			case DIRECTION.UP:
				if(x > top) {
					x--;
				} else {
					y++;
					direction = DIRECTION.RIGHT;
				}
				break;
		}
	}

	return matrix;
};
