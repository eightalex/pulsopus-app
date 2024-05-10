import { IInteractionData } from '@/components/Chart';
import { AXIS_LINE_STROKE_WIDTH, CHART_POINT_OFFSET } from '@/constants/chart';
import { animated, useSpring } from '@react-spring/web';
import { FC, useRef } from 'react';

interface IChartSelectAreaProps {
	points: IInteractionData<unknown>[];
	xScale: unknown;
	yScale: unknown;
	width: number;
	height: number;
}

// TODO: create constant for diagram colours
const selectFill = '#116C36';
const selectFillOpacity = 0.4;
const dropperFill = '#03170a';
const dropperFillOpacity = 0.6;

export const ChartSelectArea: FC<IChartSelectAreaProps> = ({ points, width, height }) => {
	const id = useRef<number>(+Date.now());
	const elFirst = points?.[0];
	const elLast = points?.[points?.length - 1];
	const posFirst = elFirst?.xPos || 0.1;
	const posLast = (elLast || elFirst)?.xPos || 0.1;
	const [xMin, xMax] = [Math.min(posFirst, posLast), Math.min(Math.max(posFirst, posLast), width)]

	const spring = useSpring({
		to: {
			xStart: xMin,
			xEnd: xMax,
			selectWidth: Math.abs(xMin - xMax),
			leftWidth: CHART_POINT_OFFSET + xMin,
			rightWidth: Math.abs(width - xMax + CHART_POINT_OFFSET),
		},
		config: {
			friction: 20,
		},
	});

	return (
		<g style={{ touchAction: 'none', pointerEvents: 'none', userSelect: 'none'  }}>
			<defs>
				<linearGradient
					id={id.current}
					x1={0}
					y1={0}
					x2={0}
					y2={1}
				>
					<stop
						offset={0}
						stopColor={selectFill}
						stopOpacity={0.6}
					/>
					<stop
						offset={0.1}
						stopColor={selectFill}
						stopOpacity={0.7}
					/>
					<stop
						offset={0.3}
						stopColor={selectFill}
						stopOpacity={0.8}
					/>
					<stop
						offset={0.5}
						stopColor={selectFill}
						stopOpacity={0.9}
					/>
					<stop
						offset={0.7}
						stopColor={selectFill}
						stopOpacity={0.8}
					/>
					<stop
						offset={0.9}
						stopColor={selectFill}
						stopOpacity={0.7}
					/>
					<stop
						offset={1}
						stopColor={selectFill}
						stopOpacity={0.7}
					/>
				</linearGradient>
			</defs>
			{Boolean(posFirst) && (
				<animated.line
					x1={spring.xStart}
					x2={spring.xStart}
					y1={0}
					y2={height}
					stroke={selectFill}
					strokeWidth={AXIS_LINE_STROKE_WIDTH}
				/>
			)}
			{Boolean(posFirst) && Boolean(posLast) && (
				<>
					<animated.rect
						x={-CHART_POINT_OFFSET}
						y={0}
						width={spring.leftWidth}
						height={height}
						opacity={1}
						stroke="none"
						fill={dropperFill}
						fillOpacity={dropperFillOpacity}
					/>

					<animated.rect
						x={spring.xStart}
						y={0}
						width={spring.selectWidth}
						height={height}
						opacity={1}
						stroke="none"
						fill={`url(#${id.current})`}
						fillOpacity={selectFillOpacity}
					/>
					<animated.rect
						x={spring.xEnd}
						y={0}
						width={spring.rightWidth}
						height={height}
						opacity={1}
						stroke="none"
						fill={dropperFill}
						fillOpacity={dropperFillOpacity}
					/>
				</>
			)}
			{Boolean(posLast) && (
				<animated.line
					x1={spring.xEnd}
					x2={spring.xEnd}
					y1={0}
					y2={height}
					stroke={selectFill}
					strokeWidth={AXIS_LINE_STROKE_WIDTH}
				/>
			)}
		</g>
	);
};
