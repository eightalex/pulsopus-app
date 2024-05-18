import { Loader } from '@/components/Loader';
import { useStores } from '@/hooks';
import { PeopleDynamicView } from '@/modules/PeopleDynamic/PeopleDynamicView/PeopleDynamicView';
import Stack from '@mui/material/Stack';
import { observer } from 'mobx-react';
import { memo, useEffect } from 'react';
import { PeopleDynamicActions } from './PeopleDynamicActions';

const PeopleDynamic = observer(() => {
	const {
		rootStore: {
			usersStore: { usersMap },
			peopleDynamicStore: { mountStore, unmountStore, isLoading }
		}
	} = useStores();

	useEffect(() => {
		mountStore();
		return () => {
			unmountStore();
		};
	}, [mountStore, unmountStore]);

	return (
		<Stack
			spacing={8}
			flexGrow={1}
		>
			{isLoading && <Loader fullSize/>}
			{!isLoading && Boolean(usersMap.size) && (
				<>
					<PeopleDynamicActions/>
					<PeopleDynamicView/>
				</>
			)}
		</Stack>
	);
});

export default memo(PeopleDynamic);
