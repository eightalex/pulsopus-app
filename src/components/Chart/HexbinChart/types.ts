import { Selection, ZoomBehavior, ZoomedElementBaseType } from 'd3';
import { RefObject } from 'react';
import { IInteractionData } from '@/components/Chart';

export type TZoomBehavior = ZoomBehavior<ZoomedElementBaseType, unknown>;

export type TSvgSelection = Selection<SVGSVGElement | null, unknown, null, undefined>;

export interface IHexbinScaleExtent {
	min: number;
	max: number;
}

export interface IHexbinChartMatrixParam<T> {
	fill: string;
	value: number;
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
	matrix: IHexbinChartMatrixParam<T>[][];
	getInstances: (instances: IInstancesParams) => void;
	scaleExtent: IHexbinScaleExtent;
	onScaled?: (scale: number) => void;
	onClick?: (data: T) => void;
	renderTooltip?: (data: IInteractionData<T>) => JSX.Element;
}
