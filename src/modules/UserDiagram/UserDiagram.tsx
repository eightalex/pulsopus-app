import { Loader } from '@/components/Loader';
import { useStores } from '@/hooks';
import { UserDiagramComponent } from '@/modules/UserDiagram/UserDiagramComponent';
import { Stack } from '@mui/material';
import { observer } from 'mobx-react';
import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ILocationState {
	id: string;
}

export const UserDiagram = observer(() => {
	const location = useLocation<ILocationState>();
	const {
		rootStore: {
			userDiagramStore: { mountStore, unmountStore, isLoading },
		}
	} = useStores();
	const userId = location?.state?.id;

	useEffect(() => {
		mountStore(userId);
		return () => {
			unmountStore();
		};
	}, [userId, mountStore, unmountStore]);

	return (
		<Stack flexGrow={1}>
			{isLoading && <Loader fullSize/>}
			<UserDiagramComponent/>
		</Stack>
	);
});

export default memo(UserDiagram);
