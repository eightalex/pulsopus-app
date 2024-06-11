import { Stack } from '@mui/material';
import { observer } from 'mobx-react';
import moment from "moment";

import Typography from '@/components/Typography';
import { useStores } from '@/hooks';

export const PeopleDynamicViewTable = observer(() => {
	const { rootStore: { peopleDynamicStore: { usersForRender } } } = useStores();
	return (
		<div>
			<Stack spacing={1}>
				{usersForRender && Boolean(usersForRender.length) && usersForRender.map((user) => {
					const { id, username, department, position, activity } = user;
					const a = Math.round(activity[0]?.value || 0);
					const t = Number(activity[0].date) ? moment(Number(activity[0].date)).format('lll') : 'Invalid date';
					return (
						<Stack direction="row" spacing={2} key={id} width={'60%'} justifyContent='space-between'>
							<Stack direction='row' spacing={4}>
							<Typography>{id}</Typography>
							<Typography>{username}</Typography>
							</Stack>
							<Stack direction='row' spacing={3}>
							<Typography>{department?.value}</Typography>
							<Typography>{position?.value}</Typography>
							<Typography>{a}</Typography>
							<Typography>{t}</Typography>
							</Stack>
						</Stack>
					);
				})}
			</Stack>
		</div>
	);
});
