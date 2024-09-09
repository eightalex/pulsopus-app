import * as d3 from "d3";
import { IHexbinChartProps } from "@/components/Chart/HexbinChart";
import { IHexbinWidgetProps } from "@/components/HexbinWidget";
import { generateMatrixData } from '@/helpers/generateMatrixData';
import { getColorByActivity } from '@/helpers/getColorByActivity';

export const WIDTH = 800;
export const HEIGHT = 550;
export const RADIUS = 20;

export const useHexbinWidgetData = <TData>(data: IHexbinWidgetProps<TData>["data"]): IHexbinChartProps<TData>["matrix"] => {
	const [min, max] = d3.extent(data, (d) => d.value);
	const d = data
		.sort((p, n) => Number(n.value) - Number(p.value))
		.map(({ data, value }) => {
			return {
				fill: getColorByActivity(value || 0, {
					min,
					max
				}),
				value,
				data,
			};
		});
	const rows = Math.ceil(HEIGHT / (RADIUS * 1.5)) - 1;
	const cols = Math.ceil(WIDTH / (RADIUS * Math.sqrt(3))) - 2;
	return generateMatrixData(rows, cols, d);
};
