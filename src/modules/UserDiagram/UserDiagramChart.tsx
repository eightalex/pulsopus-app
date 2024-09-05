import { observer } from 'mobx-react';
import moment from 'moment';
import { useCallback, useMemo } from 'react';

import { IChartDataPoint, IInteractionData, LineChart } from '@/components/Chart';
import { useStores } from '@/hooks';
import { AppActionContainerStyled } from '@/modules/AppModule';
import { UserDiagramChartTooltip } from "@/modules/UserDiagram/UserDiagramChartRenderTooltip.tsx";

export const UserDiagramChart = observer(() => {
    const {
        rootStore: {
            userDiagramStore: { chartData, setCalendarRange },
        },
    } = useStores();

    const chartDataPoints = useMemo(
        (): IChartDataPoint[][] =>
            chartData.map(({ activity = [] }) => activity
                .map((act) => ({ x: Number(act.date), y: act.rate || 0 } as IChartDataPoint)))
        , [chartData]);

    console.log('chartData', chartData);

    const handleSelectRange = useCallback((d: IInteractionData<unknown>[] = []) => {
        const t1 = d[0]?.data.x;
        const t2 = d[d.length - 1]?.data.x;
        if (!t1 || !t2) return;
        const [from, to] = [
            moment(t1).startOf('day').valueOf(),
            moment(t2).startOf('day').valueOf(),
        ].sort((a, b) => a - b);
        setCalendarRange({ from, to }, 7);
    }, [setCalendarRange]);

    return (
        <AppActionContainerStyled>
            <LineChart
                data={chartDataPoints}
                onSelect={handleSelectRange}
                renderTooltip={point => <UserDiagramChartTooltip point={point}/>}
            />
        </AppActionContainerStyled>
    );
});
