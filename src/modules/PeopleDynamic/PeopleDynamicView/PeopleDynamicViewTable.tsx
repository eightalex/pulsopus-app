import Table from '@/components/Table';
import Typography from '@/components/Typography';
import { useStores } from '@/hooks';
import { Stack } from '@mui/material';
import { observer } from 'mobx-react';

export const PeopleDynamicViewTable = observer(() => {
	const { rootStore: { peopleDynamicStore: { usersForRender } } } = useStores();
	return (
		<div>
			<Stack spacing={1}>
				{usersForRender && Boolean(usersForRender.length) && usersForRender.map((user) => {
					const { id, firstName, lastName, department, activity } = user;
					return (
						<Stack direction="row" spacing={2} key={id} width={'60%'} justifyContent='space-between'>
							<Stack direction='row' spacing={4}>
							<Typography>{id}</Typography>
							<Stack direction="row" spacing={2}>
								<Typography>{firstName}</Typography>
								<Typography>{lastName}</Typography>
							</Stack>
							</Stack>
							<Stack direction='row' spacing={3}>
							<Typography>{department?.label}</Typography>
							<Typography>{Math.round(activity[0]?.rate || 0)}</Typography>
							</Stack>
						</Stack>
					);
				})}
			</Stack>
			<Table/>
		</div>
	);
});
