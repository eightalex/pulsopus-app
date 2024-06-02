import moment from 'moment';
import { FC, useMemo } from 'react';

import { IAxisBottomProps } from '@/components/Chart';
import {
	AXIS_BOTTOM_PIX_PER_TICK,
	AXIS_TEXT_FILL,
	AXIS_TEXT_FONT_SIZE,
	AXIS_TEXT_OPACITY
} from '@/constants/chart';
import { dayMomentFormatter, renderDateTimeLine } from '@/helpers/renderChartDateTimeLine';

export const AxisBottom: FC<IAxisBottomProps> = (props) => {
	const {
		xScale,
		pixelsPerTick = AXIS_BOTTOM_PIX_PER_TICK,
		values: initValues = [],
		renderLabel,
	} = props;
	const range = xScale.range();

	const values = useMemo(() => [...new Set(initValues)], [initValues]);

	const isDateValues = values.every((v) => moment(v).isValid());

	const ticks = useMemo(() => {
		const width = range[1] - range[0];
		const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

		if (renderLabel && typeof renderLabel === 'function') {
			return values.map((axisValue) => {
				const { value = axisValue, title } = renderLabel(axisValue, values);
				return {
					value,
					title,
					xOffset: xScale(value),
				};
			});
		}

		// if (isDateValues) {
		// 	return renderDateTimeLine(values)
		// 		.map(({ value, title }) => ({ value, title, xOffset: xScale(value) }));
		// }

		return xScale
			.ticks(numberOfTicksTarget)
			.reduce((acc, value, index, values) => {
				return [...acc, {
					value,
					title: dayMomentFormatter(values, value),
					xOffset: xScale(value),
					index,
				}];
			}, []);

		// return xScale
		// 	.ticks(numberOfTicksTarget)
		// 	.reduce((acc, value) => {
		// 		const title = moment(value).format('DD.MM');
		// 		if (acc.find((v) => v.title === title)) {
		// 			return acc;
		// 		}
		// 		return [...acc, {
		// 			value,
		// 			title,
		// 			xOffset: xScale(value),
		// 		}];
		// 	}, []);
	}, [renderLabel, isDateValues, range, pixelsPerTick, xScale, values]);

	return (
		<>
			{ticks.map(({ value, xOffset, title }, idx) => {
				const textAnchor = !idx
					? 'start'
					: ticks.length - 1 === idx
						? 'end'
						: 'middle';
				return (
					<g
						key={value}
						transform={`translate(${xOffset}, 0)`}
						shapeRendering={'crispEdges'}
					>
						<text
							key={value}
							style={{
								textAnchor: 'middle',
								// textAnchor,
								fontSize: AXIS_TEXT_FONT_SIZE,
								transform: `translate(${title.length}px, 20px)`,
								fill: AXIS_TEXT_FILL,
								fillOpacity: AXIS_TEXT_OPACITY
							}}
						>
							{title.toString()}
						</text>
					</g>
				);
			})}
		</>
	);
};
