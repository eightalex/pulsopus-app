import Stack from "@mui/material/Stack";
import { observer } from 'mobx-react';
import { memo, useEffect } from 'react';

import { ContentContainer } from "@/components/ContentContainer";
import { Loader } from '@/components/Loader';
import Typography from "@/components/Typography";
import { useStores } from '@/hooks';
import { PeopleDynamicView } from '@/modules/PeopleDynamic/PeopleDynamicView/PeopleDynamicView';

import { PeopleDynamicActions } from './PeopleDynamicActions';

const PeopleDynamic = observer(() => {
	const {
		rootStore: {
			usersStore: { usersMap },
			peopleDynamicStore: {
				mountStore,
				unmountStore,
				isLoadingMounting: isLoading,
			}
		}
	} = useStores();

	useEffect(() => {
		mountStore();
		return () => {
			unmountStore();
		};
	}, [mountStore, unmountStore]);

	if(isLoading) {
		return <Loader fullSize/>;
	}

	return (
		<ContentContainer
			actions={<PeopleDynamicActions/>}
		>
			<>
				{!isLoading && !usersMap.size && (
					<Stack
						alignItems='center'
						justifyContent='center'
						flexGrow={1}
					>
						<Typography>No users found!</Typography>
					</Stack>
				)}
				{!isLoading && Boolean(usersMap.size) && <PeopleDynamicView/>}
			</>
		</ContentContainer>
	);
});

export default memo(PeopleDynamic);
