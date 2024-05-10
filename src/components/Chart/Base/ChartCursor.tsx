import {
	AXIS_LINE_STROKE,
	AXIS_LINE_STROKE_OPACITY,
	AXIS_LINE_STROKE_WIDTH,
	AXIS_TEXT_FILL,
	CHART_TOOLTIP_POINT_RADIUS
} from '@/constants/chart';
import { animated, useSpring } from '@react-spring/web';
import { FC, SVGProps } from 'react';

interface IChartCursorProps {
	x: number;
	y: number;
	width: number;
	height: number;
}

export const ChartCursor: FC<IChartCursorProps> = ({ x, y, height }) => {
	const line = useSpring({
		to: {x: Math.max(0, x), y: Math.max(0, y)},
		config: {
			friction: 20,
		},
	});

	return (
		<g>
			<animated.line
				x1={line.x}
				x2={line.x}
				y1={0}
				y2={height}
				stroke={AXIS_LINE_STROKE}
				strokeWidth={AXIS_LINE_STROKE_WIDTH}
				strokeOpacity={AXIS_LINE_STROKE_OPACITY}
			/>
			<animated.circle
				cx={line.x}
				cy={line.y}
				r={CHART_TOOLTIP_POINT_RADIUS}
				fill={AXIS_TEXT_FILL}
			/>
		</g>
	);
};
