import { IAxisLeftProps } from '@/components/Chart';
import {
	AXIS_LINE_STROKE,
	AXIS_LINE_STROKE_OPACITY,
	AXIS_LINE_STROKE_WIDTH,
	AXIS_TEXT_FILL,
	AXIS_TEXT_FONT_SIZE,
	AXIS_TEXT_OPACITY,
	AXIS_LEFT_OFFSET, AXIS_LEFT_PIX_PER_TICK,
} from '@/constants/chart';
import { FC, useMemo } from 'react';

export const AxisLeft: FC<IAxisLeftProps> = ({ yScale, pixelsPerTick = AXIS_LEFT_PIX_PER_TICK, width }) => {
	const range = yScale.range();

	const ticks = useMemo(() => {
		const height = range[0] - range[1];
		const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

		return yScale.ticks(numberOfTicksTarget).map((value) => ({
			value,
			yOffset: yScale(value),
		}));
	}, [pixelsPerTick, range, yScale]);

	return (
		<>
			{ticks.map(({ value, yOffset }) => (
				<g
					key={value}
					transform={`translate(30, ${yOffset})`}
					shapeRendering={'crispEdges'}
				>
					<text
						key={value}
						style={{
							fontSize: AXIS_TEXT_FONT_SIZE,
							textAnchor: 'end',
							transform: 'translate(-8px, 4px)',
							fill: AXIS_TEXT_FILL,
							fillOpacity: AXIS_TEXT_OPACITY
						}}
					>
						{value || '0%'}
					</text>

					<line
						x1={0}
						x2={width - AXIS_LEFT_OFFSET}
						stroke={AXIS_LINE_STROKE}
						strokeWidth={AXIS_LINE_STROKE_WIDTH}
						strokeOpacity={AXIS_LINE_STROKE_OPACITY}
					/>
				</g>
			))}
		</>
	);
};
