import Stack from '@mui/material/Stack';
import { observer } from 'mobx-react';
import moment from 'moment';
import { FC, useMemo } from 'react';

import { IChartDataPoint } from '@/components/Chart';
import Typography from '@/components/Typography';
import { CHART_COLORS } from '@/constants/chart';
import { useStores } from '@/hooks';
import { IActivity, IUserDiagramChartData } from '@/interfaces';

interface IUserDiagramChartTooltipProps {
    point: IChartDataPoint
}

interface IChartRenderData extends IUserDiagramChartData {
    value: number,
    fill: string
}

export const UserDiagramChartTooltip: FC<IUserDiagramChartTooltipProps> = observer(({ point }) => {
    const {
        rootStore: {
            userDiagramStore: { chartData },
        },
    } = useStores();

	const renderData = useMemo((): Array<IChartRenderData> => {
		const findActivity = (activities: IActivity[]): IActivity => {
			const { x } = point;
			return activities.find(({ date }) => {
				return [date, x]
					.map((d) => moment(Number(d)).startOf('day').valueOf())
					.every((d, _, arr) => d === arr[0]);
			}) || {} as IActivity;
		};
		return chartData
			.filter((d) => Boolean(d))
			.map((d,  index) => {
				const { value, rate, trend } = findActivity(d.activity);
				return {
					...d,
					value,
                    rate,
                    trend,
                    fill: CHART_COLORS[index] || CHART_COLORS[0],
				} as IChartRenderData;
			})
			.sort((p, n) => n.rate - p.rate);
	}, [chartData, point]);


    return (
        <Stack spacing={2}>
            <Typography
                variant="head2"
                fontSize={12}
            >
				{point?.x && moment(point.x).format('ddd ll')}
            </Typography>
            <Stack spacing={1}>
                {renderData.map(({ title, rate, trend, value, fill: color }, index) => {
					const renderData:Array<[string,  number]> = [
						['Activity', value],
						['Rate', rate],
						['Trend', trend]
					].map(([k, v]) => [k, v.toFixed(2)]);
                    return (
                        <Stack spacing={0} key={title} sx={{ color }}>
                            <Typography
                                variant="head2"
                                fontSize={14}
								lineHeight={1}
                                sx={{ color: 'inherit' }}
                                noWrap
                            >
                                {title}
                            </Typography>
							<Stack spacing={0} sx={{ color: 'inherit' }}>
								{renderData.map((row) => (
									<Stack
										key={`${title}-${row.map(v => v.toString()).join(' ')}`}
										direction='row'
										spacing={1}
										justifyContent='space-between'
									>
										{row.map((v) => (
											<Typography
												variant="text"
												fontSize={12}
												lineHeight={1}
                                                sx={{ color: 'inherit' }}
											>
												{v}
											</Typography>
										))}
									</Stack>
								))}
							</Stack>
                        </Stack>
                    );
                })}
            </Stack>
        </Stack>
    );
});
