import Stack from '@mui/material/Stack';
import { observer } from 'mobx-react';
import { useMemo } from 'react';

import { AreaChart } from '@/components/Chart';
import { Loader } from '@/components/Loader';
import Typography from '@/components/Typography';
import { useStores } from '@/hooks';

const ABSOLUTE_DATA_TITLE = 'Absolute data';

export const PeopleDynamicViewAbsoluteData = observer(() => {
	const {
		rootStore: {
			peopleDynamicStore: { absoluteActivityData }
		}
	} = useStores();

	const data = useMemo(() => absoluteActivityData.activities.map(({ date, rate }) => ({
		x: Number(date),
		y: Number(rate)
	})), [absoluteActivityData]);
	return (
		<Stack spacing={3}>
			<Typography variant="text">{ABSOLUTE_DATA_TITLE.toUpperCase()}</Typography>
			{!data && <Loader/>}
			{data && (
				<AreaChart
					data={data}
					height={200}
					disableSelect
					disableTooltip
				/>
			)}
		</Stack>
	);
});
