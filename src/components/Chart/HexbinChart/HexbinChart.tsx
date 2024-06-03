import Box from '@mui/material/Box';
import * as d3 from 'd3';
import { hexbin } from 'd3-hexbin';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { IInteractionData } from '@/components/Chart';
import { TooltipChartHex } from '@/components/Chart/Base/TooltipChartHex';
import { fillMatrixHexbinChart } from '@/components/Chart/HexbinChart/fillMatrixHexbinChart';
import { HexbinChartItem } from '@/components/Chart/HexbinChart/HexbinChartItem';
import { HEX_CHART_RADIUS_DEFAULT } from "@/constants/chart.ts";
import { createRoundedPathByString } from "@/helpers/createRoundedPathByCoords.ts";
import { useDimensions } from '@/hooks';

import { IHexbinChartProps, TZoomBehavior } from './types';

const r = HEX_CHART_RADIUS_DEFAULT;

// const HexbinChart: <T>(props: IHexbinChartProps<T>) => ReactElement<IHexbinChartProps<T>> = (props) => {
function HexbinChart<T>(props: IHexbinChartProps<T>) {
	const {
		width: incomeWidth,
		height: incomeHeight,
		matrix,
		scaleExtent,
		getInstances,
		onScaled,
		onClick,
		renderTooltip
	} = props;
	const tooltipRef = useRef<HTMLDivElement>();
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const svgRef = useRef<SVGSVGElement | null>(null);
	const zoomInstanceRef = useRef<TZoomBehavior>();
	const prevScale = useRef<number>(scaleExtent.min);
	const [hovered, setHovered] = useState<IInteractionData<T> | null>(null);

	const { width: wrapperWidth, height: wrapperHeight } = useDimensions(wrapperRef);

	const width = useMemo(() => incomeWidth || wrapperWidth || 800, [incomeWidth, wrapperWidth]);
	const height = useMemo(() => incomeHeight || wrapperHeight || 558, [incomeHeight, wrapperHeight]);

	const boundsWidth = useMemo(() => width, [width]);
	const boundsHeight = useMemo(() => height , [height]);

	const hexes = useMemo(
		() => fillMatrixHexbinChart(matrix, boundsWidth, boundsHeight, r),
		[matrix, boundsWidth, boundsHeight, r]);

	const hexbinGenerator = useMemo(() => hexbin()
			.radius(r)
			.extent([[0, 0], [boundsWidth, boundsHeight]]),
		[boundsWidth, boundsHeight]);

	const hexagonPath = useMemo(() => hexbinGenerator.hexagon(), [hexbinGenerator]);

	const data = useMemo(() => hexes.matrix.flatMap((row, y, arr) =>
		row.map((col, x) => ({
			x,
			y,
			xc: hexes.r * x * Math.sqrt(3),
			yc: y * hexes.r * 1.5,
			fill: col?.fill,
			data: col?.data ? { ...col.data } : null,
			idx: y * arr.length + x,
		}))
	), [hexes]);

	const shapes = useMemo(() => data.reduce((acc, item) => {
		const arr = acc[item?.fill] || [];
		acc[item.fill] = [...arr, item];
		return acc;
	}, {} as Record<string, unknown>), [data]);

	const renderShapes = useMemo(() => Object.entries(shapes)
		.map(([_, v]) => [uuidv4() as string, v])
		.map(([k, s]) => {
		const hexbinGroupData = hexbinGenerator(
			s.map((item) => [item.xc, item.yc])
		);

		return (
			<g
				id={k}
				key={`${k}-${uuidv4()}`}
				style={{
					userSelect: 'none',
					pointerEvents: 'auto'
				}}
				onClick={console.log}
				onMouseUp={console.log}
			>
			{/*<g id={k} key={k}>*/}
				{hexbinGroupData.map((d, i) => {
					const point = s[i];
					const offset = { x: d.x, y: d.y };
					const position = { x: point.x, y: point.y };
					return (
						<HexbinChartItem
							key={`${k}-${i}`}
							d={hexagonPath}
							offset={offset}
							position={position}
							fill={point.fill}
							// urlId={point.data?.id ? `pattern-${point.data?.id }` : null}
							svg={svgRef}
							groupId={k}
							hovering={!!point.data}
							onMouseOver={(e) => {
								const { currentTarget } = e;
								const offset = currentTarget.getBoundingClientRect();
								const parentOffset = svgRef?.current?.getBoundingClientRect();
								const xPos = offset.width + offset.left - parentOffset.left; // d.x;
								const yPos = offset.height / 2 - r + offset.top - parentOffset.top;  // d.y;
								const hd: IInteractionData<T> = {
									xPos, yPos, data: point.data
								};
								setHovered(hd);
							}}
							onMouseOut={() => setHovered(null)}
							onClick={() => onClick?.(point.data)}
						/>
					);
				})}
			</g>
		);
	}), [hexagonPath, hexbinGenerator, onClick, shapes]);

	const onZoomed = ({ transform, sourceEvent }) => {
		setHovered(null);
		const svg = d3.select(svgRef.current);
		if (sourceEvent) {
			onScaled?.(transform.k);
		}
		prevScale.current = transform;
		svg.selectAll('g').attr('transform', transform);
	};

	useEffect(() => {
		// TODO: remove test code
		if (svgRef && svgRef.current) {
			const svg = d3.select(svgRef.current);
			const extend: Record<'s' | 'e', [number, number]> = {
				s: [0, 0],
				e: [width, height],
			};
			const translateExtent: Record<'s' | 'e', [number, number]> = {
				s: [-8.3, -9.6],
				e: [width -8.3, height -9.6]
			};
			const zoom = d3.zoom()
				// .wheelDelta(1)
				// .extent([[r, r], [width, height]])
				// .extent([[r + 3, r + 6], [width - r, height - r]])
				// .extent([[0, 0], [width - r, height - r]])
				// .translateExtent([[-20, -20], [width, height]])
				// .extent([[20, 20], [width - 20, height - 20]])
				.duration(600)
				.translateExtent([translateExtent.s, translateExtent.e])
				.extent([extend.s, extend.e])
				.scaleExtent([scaleExtent.min, scaleExtent.max])
				.on('zoom', onZoomed);
			svg.call(zoom);
			zoomInstanceRef.current = zoom;
		}
	}, [svgRef, width, height, scaleExtent, onZoomed]);

	useEffect(() => {
		if (svgRef && svgRef.current && zoomInstanceRef && zoomInstanceRef.current) {
			const svg = d3.select(svgRef.current);
			getInstances?.({
				svgRef: svgRef,
				svgInstance: svg,
				zoomInstance: zoomInstanceRef.current,
			});
		}
	}, [svgRef, getInstances]);

	return (
		<Box
			component="div"
			ref={wrapperRef}
			sx={{
				position: 'relative',
				width: '100%',
				height: 'auto',
				aspectRatio: Number(width / height) || 1.42,
				maxHeight: height,
			}}
		>
			<svg
				viewBox={`0 0 ${width} ${height}`}
				ref={svgRef}
			>
				<defs>
					{data
						.filter(({ data }) => !!data)
						.map(({ data: { id, avatar } }, i) => (
							<pattern
								key={`${i}-${id}-${avatar}`}
								id={`pattern-${id}`}
								patternUnits="userSpaceOnUse"
								width="100%"
								height="100%"
							>
								<image
									x={0}
									y={0}
									href={avatar}
									width={34}
									height={40}
								/>
							</pattern>
						))
					}
				</defs>

				<g
					width={width}
					height={height}
					transform={`translate(${[r - 3.5, r - 0.5].join(',')})`}
				>
					{renderShapes}
				</g>
			</svg>
			<TooltipChartHex
				ref={tooltipRef}
				interactionData={Boolean(renderTooltip) && hovered}
				r={r}
			>
				{hovered && renderTooltip?.<T>(hovered)}
			</TooltipChartHex>
		</Box>
	);
}

export default memo(HexbinChart);
