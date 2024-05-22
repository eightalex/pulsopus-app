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
			peopleDynamicStore: { absoluteDtaActivities }
		}
	} = useStores();

	const data = useMemo(() => absoluteDtaActivities.map(({ date, value }) => ({
		x: Number(date),
		y: Number(value)
	})), [absoluteDtaActivities]);
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
