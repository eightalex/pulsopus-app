import { AreaChartItem } from '@/components/Chart/AreaChart/AreaChartItem';
import { ChartBase } from '@/components/Chart/Base/ChartBase';
import { IChartBaseProps, IChartChildrenParams, IChartDataPoint, IInteractionData } from '@/components/Chart';
import { MARGIN_LEFT, MARGIN_TOP } from '@/constants/chart';
import Box from '@mui/material/Box';
import * as d3 from 'd3';
import { FC, memo, useMemo, useState } from 'react';

// TODO: improve types
// Function to compute density
function kernelDensityEstimator(kernel: (v: number) => number, X: number[]) {
	return function (V: number[]) {
		return X.map((x) => [x, d3.mean(V, (v) => kernel(x - v))]);
	};
}

function kernelEpanechnikov(k: number) {
	return function (v: number) {
		return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
	};
}

const AreaChartInner: FC<IChartChildrenParams> = memo((props) => {
	const { xScale, yScale, data, height, boundsWidth, boundsHeight } = props;
	const [hovered, setHovered] = useState<IInteractionData | null>(null);

	const density = useMemo(() => {
		const kde = kernelDensityEstimator(kernelEpanechnikov(7), xScale.ticks(40));
		return kde(data);
	}, [xScale, data]);

	const lineBuilder = d3
		.line<IChartDataPoint>()
		.x((d) => xScale(d.x))
		.y((d) => yScale(d.y));
	// .curve(d3.curveBasis);

	const areaBuilder = d3
		.area<IChartDataPoint>()
		.x((d) => xScale(d.x))
		.y1((d) => yScale(d.y))
		.y0(yScale(0));
	// .y0((d) => yScale(d.y * 0.15))
	// .curve(d3.curveBasis);

	const linePath = lineBuilder(data);
	const areaPath = areaBuilder(data);

	return (
		<>
			{!!hovered && (
				<Box
					component="div"
					sx={{
						width: boundsWidth,
						height: boundsHeight,
						position: 'absolute',
						top: 0,
						left: 0,
						pointerEvents: 'none',
						marginLeft: MARGIN_LEFT,
						marginTop: MARGIN_TOP,
					}}
				>
					<Box
						component="div"
						sx={{
							position: 'absolute',
							left: hovered.xPos,
							top: hovered.yPos,
						}}
					>
						<text
							transform={`translate(${hovered.xPos},${hovered.yPos})`}
							dy="0.38em"
							textAnchor="middle"
						>
							{hovered.value}
						</text>
					</Box>
				</Box>
			)}
			<AreaChartItem
				linePath={linePath}
				areaPath={areaPath}
			/>
		</>
	);
});

const AreaChart: FC<IChartBaseProps> = ({ data, width, height, ...restProps }) => {
	return (
		<ChartBase
			width={width}
			height={height}
			data={data}
			{...restProps}
		>
			{(params) => (
				<AreaChartInner
					{...params}
					data={data}
					height={height}
				/>
			)}
		</ChartBase>
	);
};

export default memo(AreaChart);
