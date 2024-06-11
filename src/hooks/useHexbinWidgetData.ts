import { generateMatrixData } from '@/helpers/generateMatrixData';
import { getColorByActivity } from '@/helpers/getColorByActivity';
import { IUser } from '@/interfaces';

export const WIDTH = 800;
export const HEIGHT = 550;
export const RADIUS = 20;

/**
 * @deprecated: refactor hexbin chart
 * */
export const useHexbinWidgetData = (data: IUser[]): { fill: string, data: IUser }[][] => {
	const d = data
		.sort((a, b) => +b.activity[0]?.value - +a.activity[0]?.value)
		.map((data) => ({ fill: getColorByActivity(data.activity[0]?.value || 0), data }));
	const rows = Math.ceil(HEIGHT / (RADIUS * 1.5)) - 1;
	const cols = Math.ceil(WIDTH / (RADIUS * Math.sqrt(3))) - 2;
	return generateMatrixData(rows, cols, d);
};
