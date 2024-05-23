import { Collapse } from '@mui/material';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { Loader } from "@/components/Loader";
import Typography from '@/components/Typography';
import { useStores } from '@/hooks';
import HexbinWidget from '@/modules/HexbinWidget/HexbinWidget';
import { PeopleDynamicViewAbsoluteData } from '@/modules/PeopleDynamic/PeopleDynamicView/PeopleDynamicViewAbsoluteDate';
import { PeopleDynamicViewContent } from '@/modules/PeopleDynamic/PeopleDynamicView/PeopleDynamicViewContent';
import { PeopleDynamicViewInfo } from '@/modules/PeopleDynamic/PeopleDynamicView/PeopleDynamicViewInfo';

const tooltipTitleDefault = 'Your contribution graph and Achievements show activity from public repositories. You can choose to show activity from both public and private, with specific details of your activity in private repositories anonymized.  A viewer can only see information in the activity overview about repositories they have read access to. Get more information.';

interface IGetViewDataProps {
	title: string;
	difference: number;
	values: { value: number, label: string }[];
}

const getViewDataProps = (label, data): IGetViewDataProps => {
	if (!data) return {} as IGetViewDataProps;
	return {
		title: label,
		difference: data.diff,
		values: [
			{ value: data.trend, label: 'Growth Trend' },
			{ value: data.rate, label: 'Activity Rate' },
		],
	};
};

export const PeopleDynamicViewDiagram = observer(() => {
	const {
		rootStore: {
			peopleDynamicStore: {
				department,
				showAbsoluteData,
				onToggleShowAbsoluteData,
				usersForRender,
				departmentActivityData,
				absoluteActivityData,
			}
		}
	} = useStores();
	const scrollRef = useRef<HTMLDivElement>();

	const departmentActivityViewDataProps = useMemo(() => getViewDataProps(department?.label, department && departmentActivityData), [department, departmentActivityData]);
	const absoluteActivityViewDataProps = useMemo(() => getViewDataProps('', department && absoluteActivityData), [department, absoluteActivityData]);

	const scrollToAbsolute = useCallback(() => {
		if (showAbsoluteData) {
			// TODO: create hook
			scrollRef?.current?.scrollIntoView({ behavior: 'smooth', inline: 'end' });
		}
	}, [showAbsoluteData]);

	useEffect(() => {
		scrollToAbsolute();
	}, [scrollToAbsolute]);

	if(!usersForRender?.length) return <Loader fullSize/>;

	return (
		<PeopleDynamicViewContent
			tooltipTitle={tooltipTitleDefault}
			content={
				<Stack>
					<HexbinWidget data={usersForRender}/>
					<Collapse
						onEntered={scrollToAbsolute}
						in={showAbsoluteData}
						timeout={{ enter: 100, exit: 200 }}
						easing='easy'
					>
						<PeopleDynamicViewAbsoluteData/>
					</Collapse>
					<div ref={scrollRef}/>
				</Stack>
			}
			side={(
				<Stack spacing={10}>
					<Stack spacing={6}>
						<PeopleDynamicViewInfo {...departmentActivityViewDataProps} />
						<Stack>
							<Stack
								direction="row"
								alignItems="center"
								spacing={1}
							>
								<Typography
									variant="subtitle"
									textTransform="uppercase"
									color={absoluteActivityViewDataProps.difference > 0 ? 'success' : 'primary'}
								>
									Absolute data
								</Typography>
								<Switch
									checked={showAbsoluteData}
									onChange={onToggleShowAbsoluteData}
									name="absolute.data.switch"
									sx={{
										transform: 'translateX(50%)'
									}}
								/>
							</Stack>
							<PeopleDynamicViewInfo {...absoluteActivityViewDataProps} />
						</Stack>
					</Stack>
				</Stack>
			)}
		/>
	);
});
