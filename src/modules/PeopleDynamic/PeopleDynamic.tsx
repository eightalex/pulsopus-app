import { observer } from 'mobx-react';
import { memo, useEffect } from 'react';

import { ContentContainer } from "@/components/ContentContainer";
import { Loader } from '@/components/Loader';
import { useStores } from '@/hooks';
import { PeopleDynamicView } from '@/modules/PeopleDynamic/PeopleDynamicView/PeopleDynamicView';

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
		<ContentContainer
			actions={<PeopleDynamicActions/>}
		>
			<>
				{isLoading && <Loader fullSize/>}
				{!isLoading && Boolean(usersMap.size) && <PeopleDynamicView/>}
			</>
		</ContentContainer>
	);
});

export default memo(PeopleDynamic);
