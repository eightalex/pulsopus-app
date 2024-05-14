import { Stack } from '@mui/material';
// import { observer } from 'mobx-react';
import { Location,useLocation } from 'react-router-dom';

import { Loader } from '@/components/Loader';
// import { useStores } from '@/hooks';
// import { UserDiagramComponent } from '@/modules/PersonDiagram/UserDiagramComponent';

interface ILocationState {
	id: string;
}

export const PersonDiagram = () => {
	const location: Location<ILocationState> = useLocation();
	const userId = location?.state?.id;
	console.log('userId', userId);

	// const {
	// 	rootStore: {
	// 		userDiagramStore: { mountStore, unmountStore, isLoading },
	// 	}
	// } = useStores();

	// useEffect(() => {
	// 	mountStore(userId);
	// 	return () => {
	// 		unmountStore();
	// 	};
	// }, [userId, mountStore, unmountStore]);

	const isLoading = true;

	return (
		<Stack flexGrow={1}>
			{isLoading && <Loader fullSize/>}
			{/*<UserDiagramComponent/>*/}
		</Stack>
	);
};
