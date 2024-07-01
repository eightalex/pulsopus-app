import Box from '@mui/material/Box';
import * as d3 from 'd3';
import { FC, memo, useMemo, useState } from 'react';

import { IChartChildrenParams, IChartDataPoint, IInteractionData, ILineChartProps } from '@/components/Chart';
import { ChartBase } from '@/components/Chart/Base/ChartBase';
import { LineChartCircle } from '@/components/Chart/LineChart/LineChartCircle';
import { LineChartItem } from '@/components/Chart/LineChart/LineChartItem';
import { CHART_COLORS, MARGIN_LEFT, MARGIN_TOP } from '@/constants/chart';
import { isMatrix } from '@/helpers/isMatrix';

interface ILineChartInnerProps extends IChartChildrenParams {
    data: ILineChartProps['data'];
    points?: ILineChartProps['data'];
    chartColors?: string[];
}

const LineChartInner: FC<ILineChartInnerProps> = memo((props) => {
    const {
        xScale,
        yScale,
        data: initData = [],
        points,
        height,
        boundsWidth,
        boundsHeight,
        chartColors = CHART_COLORS,
    } = props;
    const [hovered, setHovered] = useState<IInteractionData<unknown> | null>(null);

    const data = useMemo(() => (isMatrix(initData) ? initData : [initData]) as IChartDataPoint[][], [initData]);

    const lineBuilder = d3
        .line<IChartDataPoint>()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y));

    const lines = useMemo(() => data.map((d, i) => {
        const path = lineBuilder(d);
        if (!path) return;
        return (
            <LineChartItem
                key={i}
                path={path}
                color={chartColors[i]}
            />
        );
    }), [chartColors, data, lineBuilder]);

    const circles = useMemo(() => {
        return data
            .map((d, lineIndex) => {
                return d.map((item, pointIndex) => (
                    <LineChartCircle
                        key={`line-chart-${lineIndex}-${pointIndex}`}
                        color={chartColors[lineIndex]}
                        cx={xScale(item.x)}
                        cy={yScale(item.y)}
                        onMouseEnter={() =>
                            setHovered({
                                xPos: xScale(item.x),
                                yPos: yScale(item.y),
                                value: item.x,
                            })
                        }
                        onMouseLeave={() => setHovered(null)}
                    />
                ));
            }).flat();
    }, [chartColors, data, xScale, yScale]);

    return (
        <g>
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
            {lines}
            {circles}
        </g>
    );
});

const LineChart: FC<ILineChartProps> = ({ data, width, height, ...restProps }) => {
    return (
        <ChartBase
            width={width}
            height={height}
            data={data.flatMap(d => d)}
            {...restProps}
        >
            {(params) => (
                <LineChartInner
                    {...params}
                    data={data}
                    height={height}
                />
            )}
        </ChartBase>
    );
};

export default memo(LineChart);
