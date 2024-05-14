import { Collapse, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import { useMemo } from 'react';

import { useStores } from '@/hooks';
import { IDepartment, IUser } from '@/interfaces';
import { PeopleDynamicViewContent, PeopleDynamicViewInfo } from '@/modules/PeopleDynamic';
import { UserDiagramActions } from '@/modules/PersonDiagram/UserDiagramActions.tsx';
import { UserDiagramChart } from '@/modules/PersonDiagram/UserDiagramChart.tsx';

const tooltipTitleDefault = 'Your contribution graph and Achievements show activity from public repositories. You can choose to show activity from both public and private, with specific details of your activity in private repositories anonymized.  A viewer can only see information in the activity overview about repositories they have read access to. Get more information."';

const getEmployeeTitle = (user?: IUser | null) => user && `${user?.lastName} ${user?.firstName}`;

export const UserDiagramComponent = observer(() => {
	const {
		rootStore: {
			userDiagramStore: { user, userActivityData, compareActivityData, isCompare, compareValue },
		},
	} = useStores();

	const userActivityViewDataProps = useMemo(() => {
		if (!user) return {};
		return {
			title: getEmployeeTitle(user),
			difference: userActivityData.diff,
			subTitles: ['Position?', user.department.label.toUpperCase()],
			values: [
				{ value: userActivityData.trend, label: 'Growth Trend' },
				{ value: userActivityData.rate, label: 'Activity Rate' },
			],
		};
	}, [user, userActivityData]);

	const compareActivityViewDataProps = useMemo(() => {
		if (!compareValue) return {};
		const isComparedDepartment = compareValue && 'label' in compareValue;
		return {
			title: (isComparedDepartment && (compareValue as IDepartment)?.label) || getEmployeeTitle(compareValue as IUser),
			difference: compareActivityData.diff,
			subTitles: isComparedDepartment ? [] : ['Position?', (compareValue as IUser).department.label.toUpperCase()],
			values: [
				{ value: compareActivityData.trend, label: 'Growth Trend' },
				{ value: compareActivityData.rate, label: 'Activity Rate' },
			]
		};
	}, [compareValue, compareActivityData]);

	const showCompareInfo = useMemo(() => Boolean(isCompare && Boolean(compareValue)), [isCompare, compareValue]);

	return (
		<Stack
			spacing={2}
			flexGrow={1}
		>
			<UserDiagramActions/>
			<PeopleDynamicViewContent
				tooltipTitle={(user || compareValue) && tooltipTitleDefault}
				content={<UserDiagramChart/>}
				side={
					<Stack spacing={6}>
						{!!user && <PeopleDynamicViewInfo {...userActivityViewDataProps} />}
						<Collapse in={showCompareInfo}>
							<PeopleDynamicViewInfo {...compareActivityViewDataProps} />
						</Collapse>
					</Stack>
				}
			/>
		</Stack>
	);
});
