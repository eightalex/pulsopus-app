import { Stack } from '@mui/material';
import { observer } from 'mobx-react';
import { memo, useEffect } from 'react';
import { Location, useLocation } from 'react-router-dom';

import { Loader } from '@/components/Loader';
import { useStores } from '@/hooks';
import { UserDiagramComponent } from '@/modules/UserDiagram/UserDiagramComponent';

interface ILocationState {
	id: string;
}

export const UserDiagram = observer(() => {
	const location: Location<ILocationState> = useLocation();
	const {
		rootStore: {
			userDiagramStore: { mountStore, unmountStore, isLoading },
		}
	} = useStores();
	const userId = location?.state?.id;
	console.log('userId', userId);

	useEffect(() => {
		mountStore(userId);
		return () => {
			unmountStore();
		};
	}, [mountStore, unmountStore]);

	return (
		<Stack flexGrow={1}>
			{isLoading && <Loader fullSize/>}
			{/*<UserDiagramComponent/>*/}
		</Stack>
	);
});

export default memo(UserDiagram);
