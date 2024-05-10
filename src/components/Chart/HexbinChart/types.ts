import { IInteractionData } from '@/components/Chart';
import { RefObject } from 'react';
import { Selection, ZoomBehavior, ZoomedElementBaseType } from 'd3';

export type TZoomBehavior = ZoomBehavior<ZoomedElementBaseType, unknown>;

export type TSvgSelection = Selection<SVGSVGElement | null, unknown, null, undefined>;

export interface IHexbinScaleExtend {
	min: number;
	max: number;
}

interface IHexbinChartMatrix<T> {
	fill: string;
	data: T;
}

export interface IInstancesParams {
	svgRef?: RefObject<SVGSVGElement>;
	svgInstance?: TSvgSelection;
	zoomInstance?: TZoomBehavior
}

export interface IHexbinChartProps<T> {
	width?: number;
	height?: number;
	matrix: IHexbinChartMatrix<T>[][];
	getInstances: (instances: IInstancesParams) => void;
	scaleExtent: IHexbinScaleExtend;
	onScaled?: (scale) => void;
	onClick?: (data: T) => void;
	renderTooltip?: (data: IInteractionData<T>) => JSX.Element;
}
