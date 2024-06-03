import Box from '@mui/material/Box';
import * as d3 from 'd3';
import { isEqual, uniqWith } from 'lodash';
import { FC, Fragment, MouseEvent, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AxisBottom, AxisLeft, IChartBaseProps, IChartDataPoint, IInteractionData } from '@/components/Chart';
import { ChartCursor } from '@/components/Chart/Base/ChartCursor';
import { ChartSelectArea } from '@/components/Chart/Base/ChartSelectArea';
import { TooltipChartLine } from '@/components/Chart/Base/TooltipChartLine';
import {
	AXIS_LEFT_OFFSET, AXIS_TEXT_FILL, AXIS_TEXT_FONT_SIZE, AXIS_TEXT_OPACITY,
	CHART_SELECT_MIN_LENGTH,
	MARGIN_BOTTOM,
	MARGIN_LEFT,
	MARGIN_RIGHT,
	MARGIN_TOP
} from '@/constants/chart';
import { useDimensions } from '@/hooks';

const boundsTransform = `translate(${[MARGIN_LEFT, MARGIN_TOP].join(',')})`;

export const ChartBase: FC<IChartBaseProps> = (props) => {
	const {
		data,
		width: initWidth,
		height: initHeight,
		children,
		hideAxisX = false,
		hideAxisY = false,
		axisBottomProps = {},
		onSelect,
		disableSelect: initDisableSelect,
		disableTooltip,
		renderTooltip,
		...restProps
	} = props;
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const svgRef = useRef<SVGSVGElement>();
	const xAxisRef = useRef<SVGSVGElement>(null);

	const [pressed, setPressed] = useState(false);
	const [pressedPositions, setPressedPositions] = useState<IInteractionData<IChartDataPoint>[]>([]);
	const [cursorPosition, setCursorPosition] = useState<IInteractionData<IChartDataPoint> | null>(null);

	const tooltipCursor = useMemo((): IInteractionData<IChartDataPoint>[] => uniqWith(
		[cursorPosition, ...pressedPositions]
			.filter(item => Boolean(item))
			.sort((p, n) => p?.xPos - n?.xPos),
		isEqual), [cursorPosition, pressedPositions]);

	const { width: wrapperWidth } = useDimensions(wrapperRef);
	const width = initWidth || wrapperWidth || 800;
	const height = initHeight || 350;

	const boundsWidth = width - MARGIN_LEFT - MARGIN_RIGHT;
	const boundsHeight = height - MARGIN_TOP - MARGIN_BOTTOM;

	// Y axis
	const [yMin, yMax] = d3.extent(data, (d) => d.y);
	const yScale = useMemo(() => {
		// const dMax = Math.min(Math.floor((yMax || 100) * 1.2), 100);
		const dMax = Math.floor((yMax || 100) * 1.1);
		return d3
			.scaleLinear()
			.domain([0, dMax])
			.range([boundsHeight, 0]);
	}, [boundsHeight, yMax]);

	// X axis
	const xValues = useMemo(() => data.map(d => d.x), [data]);
	const [xMin, xMax] = d3.extent(data, (d) => d.x);
	const xScale = useMemo(() => {
		// .scaleLinear()
		// .scaleTime()
		return d3
			.scaleTime()
			.domain([Number(xMin), Number(xMax)])
			.range([0, boundsWidth]);
	}, [xMin, xMax, boundsWidth]);

	const disableSelect = useMemo(() => xValues.length <= CHART_SELECT_MIN_LENGTH || initDisableSelect, [xValues, initDisableSelect]);

	const getClosestPoint = (cursorPixelPosition: number) => {
		const x = xScale.invert(cursorPixelPosition);

		let minDistance = Infinity;
		let closest: IChartDataPoint | null = null;

		for (const point of data) {
			const distance = Math.abs(point.x - x);
			if (distance < minDistance) {
				minDistance = distance;
				closest = point;
			}
		}

		return closest;
	};

	const onMouseMove = useCallback((e: MouseEvent<SVGRectElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;

		const closest = getClosestPoint(mouseX);
		const data = { xPos: xScale(closest?.x || 0), yPos: yScale(closest?.y || 0), data: closest };

		if (pressed) {
			setCursorPosition(null);
			setPressedPositions(prev => !prev.length ? [data] : [prev[0], data]);
			return;
		}
		setCursorPosition(data);
	}, [getClosestPoint, xScale, yScale, pressed]);

	const onMouseDown = useCallback((e: MouseEvent<SVGRectElement>) => {
		if(disableSelect) return;
		setPressed(true);
		setPressedPositions([]);
		onMouseMove(e);
	}, [onMouseMove, disableSelect]);

	const onMouseUp = useCallback((e: MouseEvent<SVGRectElement>) => {
		setPressed(false);
		setPressedPositions([]);
		onSelect?.(pressedPositions);
	}, [onSelect, pressedPositions]);

	const onMouseLeave = useCallback((e: MouseEvent<SVGRectElement>) => {
		setCursorPosition(null);
		setPressed(false);
		setPressedPositions([]);
	}, []);

	useEffect(() => {
		const xAxis = d3.select(xAxisRef.current);
		xAxis.selectAll("*").remove();
		const xAxisGenerator = d3.axisBottom(xScale);
		const xAxesCall = xAxisGenerator
			.tickSize(0)
			.tickFormat(d3.timeFormat('%b %d'));
		xAxis
			.append("g")
			.attr("transform", "translate(0," + boundsHeight + ")")
			.call(xAxesCall.ticks(8));


		xAxis.select(".domain")
			.attr("stroke-width","0")
			.attr("opacity","0");
		xAxis.selectAll(".tick text")
			.attr("font-size",AXIS_TEXT_FONT_SIZE)
			.attr("fill",AXIS_TEXT_FILL)
			.attr("fill-opacity",AXIS_TEXT_OPACITY);
	}, [xScale, yScale, boundsHeight]);

	return (
		<Box
			component="div"
			ref={wrapperRef}
			sx={{
				position: 'relative',
				width: '100%',
				height: 'auto'
			}}
		>
			<svg
				viewBox={`0 0 ${width} ${height}`}
				ref={svgRef}
				style={{ overflow: 'unset', touchAction: 'none', pointerEvents: 'none', userSelect: 'none' }}
			>
				<g
					width={width}
					height={height}
					style={{ touchAction: 'none', pointerEvents: 'none', userSelect: 'none' }}
				>
					<g>
						{!hideAxisY && (
							<AxisLeft
								yScale={yScale}
								width={width}
							/>
						)}
					</g>

					{!hideAxisX && (
						<g
							ref={xAxisRef}
							width={width}
							height={height}
							transform={`translate(${AXIS_LEFT_OFFSET}, ${10})`}
						/>
					)}

					{/*{!hideAxisX && (*/}
					{/*	<g transform={`translate(${AXIS_LEFT_OFFSET}, ${boundsHeight})`}>*/}
					{/*		<AxisBottom*/}
					{/*			xScale={xScale}*/}
					{/*			values={xValues}*/}
					{/*			boundsWidth={boundsWidth}*/}
					{/*			boundsHeight={boundsHeight}*/}
					{/*			{...axisBottomProps}*/}
					{/*		/>*/}
					{/*	</g>*/}
					{/*)}*/}
				</g>

				<g
					width={boundsWidth}
					height={boundsHeight}
					transform={boundsTransform}
				>
					{typeof children === 'function'
						? children({
							width,
							height,
							boundsWidth,
							boundsHeight,
							xScale,
							yScale,
							svgRef: svgRef as MutableRefObject<SVGSVGElement>,
							cursorPosition,
							pressedPositions,
							...restProps,
						})
						: children}
				</g>

				<g
					width={boundsWidth}
					height={boundsHeight}
					transform={boundsTransform}
				>
					{!disableSelect && Boolean(data.length) && Boolean(pressedPositions?.length) && (
						<ChartSelectArea
							xScale={xScale}
							yScale={yScale}
							points={pressedPositions}
							width={boundsWidth}
							height={boundsHeight}
						/>
					)}

					{!disableTooltip &&
						Boolean(data.length) &&
						Boolean(tooltipCursor.length) &&
						tooltipCursor.map(({ xPos, yPos }, index) => (
							<Fragment key={`${xPos}-${yPos}-${index}`}>
								<ChartCursor
									x={xPos}
									y={yPos}
									width={boundsWidth}
									height={boundsHeight}
								/>
							</Fragment>
						))}

					<rect
						x={0}
						y={0}
						width={boundsWidth}
						height={boundsHeight}
						visibility="hidden"
						pointerEvents="all"
						onMouseDown={onMouseDown}
						onMouseUp={onMouseUp}
						onMouseMove={onMouseMove}
						onMouseLeave={onMouseLeave}
						onContextMenu={(e) => {
							e && e.preventDefault();
							e && e.stopPropagation();
							onMouseUp(e);
						}}
					/>
				</g>
			</svg>

			{!disableTooltip &&
				Boolean(data.length) &&
				Boolean(renderTooltip) &&
				Boolean(tooltipCursor.length) && (
					<TooltipChartLine
						data={tooltipCursor}
						render={renderTooltip}
					/>
				)}
		</Box>
	);
};
