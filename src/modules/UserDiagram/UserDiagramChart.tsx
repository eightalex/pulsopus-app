import Stack from '@mui/material/Stack';
import { observer } from 'mobx-react';
import moment from 'moment';
import { useCallback, useMemo } from 'react';

import { IChartDataPoint, IInteractionData, LineChart } from '@/components/Chart';
import Typography from "@/components/Typography";
import { useStores } from '@/hooks';
import { AppActionContainerStyled } from '@/modules/AppModule';
import { UserDiagramChartTooltip } from "@/modules/UserDiagram/UserDiagramChartRenderTooltip.tsx";

export const UserDiagramChart = observer(() => {
  const {
    rootStore: {
      userDiagramStore: { chartData, setCalendarRange, user },
    },
  } = useStores();

  const chartDataPoints = useMemo(
    (): IChartDataPoint[][] => {
      return chartData.reduce((res, data) => {
        if(!data?.activity.length) return res;
        const coords = data. activity
          .map((act) => ({ x: Number(act.date), y: act.rate || 0 } as IChartDataPoint));
        return [...res, coords];
      }, [] as IChartDataPoint[][]);
    }, [chartData]);


  const handleSelectRange = useCallback((d: IInteractionData<IChartDataPoint>[] = []): void => {
    const t1 = d[0]?.data?.x || 0;
    const t2 = d[d.length - 1]?.data?.x || 0;
    if (!t1 || !t2) return;
    const [from, to] = [
      moment(t1).startOf('day').valueOf(),
      moment(t2).startOf('day').valueOf(),
    ].sort((a, b) => a - b);
    setCalendarRange({ from, to }, 7);
  }, [setCalendarRange]);

  if (!user) {
    return (
      <Stack direction='row'>
        <Typography>Select an employee.</Typography>
      </Stack>
    );
  }
  return (
    <AppActionContainerStyled>
      <LineChart
        data={chartDataPoints}
        onSelect={handleSelectRange}
        renderTooltip={(point: IInteractionData<IChartDataPoint>['data']) => <UserDiagramChartTooltip point={point}/>}
        chart
      />
    </AppActionContainerStyled>
  );
});
