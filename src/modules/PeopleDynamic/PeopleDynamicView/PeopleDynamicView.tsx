import { observer } from 'mobx-react';
import { useMemo } from 'react';

import { EPeopleDynamicView } from '@/constants/EPeopleDynamic';
import { useStores } from '@/hooks';
import { PeopleDynamicViewDiagram } from '@/modules/PeopleDynamic/PeopleDynamicView/PeopleDynamicViewDiagram';

import { PeopleDynamicViewTable } from './PeopleDynamicViewTable';

const views = {
	[EPeopleDynamicView.CHART]: PeopleDynamicViewDiagram,
	[EPeopleDynamicView.TABLE]: PeopleDynamicViewTable,
};

export const PeopleDynamicView = observer(() => {
	const {
		rootStore: {
			peopleDynamicStore: { view }
		}
	} = useStores();

	const View = useMemo(() => views[view], [view]);

	return (
		<View />
	);
});
