import Stack from '@mui/material/Stack';
import { observer } from 'mobx-react';
import moment from 'moment';
import { useCallback, useMemo } from 'react';

import { LineChart } from '@/components/Chart';
import Typography from '@/components/Typography';
import { CHART_COLORS } from '@/constants/chart';
import { useStores } from '@/hooks';
import { IDepartment, IUser } from '@/interfaces';
import { AppActionContainerStyled } from '@/modules/AppModule';

const UserDiagramChartTooltip = observer(({ point }) => {
	const {
		rootStore: {
			userDiagramStore: { user, isCompare, compareValue, chartData },
		},
	} = useStores();
	const renderList = useMemo(() => {
		const res = isCompare ? [user, compareValue] : [user];
		return res.filter(item => Boolean(item));
	}, [isCompare, user, compareValue]);
	return (
		<Stack spacing={0}>
			<Typography
				variant="head2"
				fontSize={12}
			>
				{point?.x && moment(point.x).format('ddd MMM DD YYYY')}
			</Typography>
			<Stack spacing={1}>
				{renderList.map((item: IUser | IDepartment, index) => {
					if (!item) return;
					const title = 'firstName' in item ? `${item?.firstName} ${item?.lastName}` : (item as IDepartment)?.label;
					const subtitle = 'firstName' in item ? item?.department.name : '';
					const value = chartData[index]?.find((p) => p?.x === point?.x)?.y || 0;
					const color = CHART_COLORS[index] || CHART_COLORS[0];
					return (
						<Stack spacing={0} key={title}>
							<Stack
								direction="row"
								spacing={0.5}
								alignItems={'center'}
							>
								<Typography
									variant="head2"
									fontSize={14}
									sx={{ color }}
									noWrap
								>
									{title}
								</Typography>
								<Typography
									variant="text"
									fontSize={12}
									lineHeight={1}
									sx={{ color }}
								>
									-
								</Typography>
								<Typography
									variant="text"
									fontSize={14}
									lineHeight={1}
									sx={{ color }}
								>
									{Math.round(value)}
								</Typography>
							</Stack>
							{Boolean(subtitle) && (
								<Typography
									variant="text"
									fontSize={12}
									lineHeight={1}
									sx={{ color }}
								>
									{subtitle}
								</Typography>
							)}
						</Stack>
					);
				})}
			</Stack>
		</Stack>
	);
});

export const UserDiagramChart = observer(() => {
	const {
		rootStore: {
			userDiagramStore: { chartData, setCalendarRange },
		},
	} = useStores();

	const handleSelectRange = useCallback((d) => {
		const t1 = d[0]?.data.x;
		const t2 = d[d.length - 1]?.data.x;
		if (!t1 || !t2) return;
		const [from, to] = [
			moment(t1).startOf('day').valueOf(),
			moment(t2).startOf('day').valueOf(),
		].sort((a, b) => a - b);
		setCalendarRange({ from, to });
	}, [setCalendarRange]);

	return (
		<AppActionContainerStyled>
			<LineChart
				data={chartData}
				axisBottomProps={{ pixelsPerTick: 30 }}
				onSelect={handleSelectRange}
				renderTooltip={point => <UserDiagramChartTooltip point={point}/>}
			/>
		</AppActionContainerStyled>
	);
});
