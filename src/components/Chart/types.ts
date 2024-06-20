import { ScaleLinear } from 'd3';
import { MutableRefObject, ReactNode } from 'react';

export interface IAxisBottomProps {
	xScale: ScaleLinear<number, number>;
	pixelsPerTick: number;
	values: number[];
	renderLabel?: (value: number, values: number[]) => {
		value: number;
		title: string;
	};
	boundsWidth?: number;
	boundsHeight?: number;
}

export interface IAxisLeftProps {
	yScale: ScaleLinear<number, number>;
	pixelsPerTick?: number;
	width: number;
}

export interface IChartDataPoint {
	x: number;
	y: number;
}

export interface IChartChildrenParams {
	width: number;
	height: number;
	boundsWidth: number;
	boundsHeight: number;
	xScale: ScaleLinear<number, number>;
	yScale: ScaleLinear<number, number>;
	svgRef: MutableRefObject<SVGSVGElement>;
	cursorPosition?: IInteractionData<unknown> | null;
	pressedPositions?: IInteractionData<unknown>[];
}

export interface IChartBaseProps {
	width?: number;
	height?: number;
	data: IChartDataPoint[];
	children?: (params: IChartChildrenParams) => JSX.Element | ReactNode;
	hideAxisX?: boolean;
	hideAxisY?: boolean;
	axisBottomProps?: IAxisBottomProps;
	onSelect?: (pressedPositions?: IInteractionData<unknown>[]) => void;
	disableSelect?: boolean;
	disableTooltip?: boolean;
	renderTooltip?: (point: IInteractionData<IChartDataPoint>['data']) => ReactNode;
}

interface IExtenderChartBaseProps extends Pick<IChartBaseProps, 'width' | 'height'> {
}

export interface ILineChartProps extends IExtenderChartBaseProps {
	data: IChartDataPoint[][] | IChartDataPoint[];
}

export interface IInteractionData<T> {
	xPos: number;
	yPos: number;
	value: number;
	data?: T;
}
