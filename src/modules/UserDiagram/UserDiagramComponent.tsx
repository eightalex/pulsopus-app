import { Stack } from '@mui/material';
import { observer } from 'mobx-react';

import { ContentContainer } from "@/components/ContentContainer";
import { RateTrendView } from "@/components/RateTrendView";
import { CHART_COLORS } from "@/constants/chart.ts";
import { useStores } from '@/hooks';
import { PeopleDynamicViewContent } from '@/modules/PeopleDynamic';
import { UserDiagramActions } from '@/modules/UserDiagram/UserDiagramActions';
import { UserDiagramChart } from '@/modules/UserDiagram/UserDiagramChart';

const tooltipTitleDefault = 'Your contribution graph and Achievements show activity from public repositories. You can choose to show activity from both public and private, with specific details of your activity in private repositories anonymized.  A viewer can only see information in the activity overview about repositories they have read access to. Get more information.';

export const UserDiagramComponent = observer(() => {
	const {
		rootStore: {
			userDiagramStore: { chartData, user, compareValue },
		},
	} = useStores();


	return (
		<ContentContainer
			actions={<UserDiagramActions/>}
		>
			<PeopleDynamicViewContent
				tooltipTitle={(user || compareValue) && tooltipTitleDefault || ''}
				content={<UserDiagramChart/>}
				side={
					<Stack spacing={6}>
						{Boolean(chartData.length) && chartData.map((data, idx) => {
							const {
								title,
								rate,
								trend,
								currentRateValue,
								prevRateValue,
								subtitles = []
							} = data;
							const tooltips = [
								{ label: 'curr period', value: currentRateValue },
								{ label: 'prev period', value: prevRateValue },
								{ label: 'rate', value: rate },
							].map((el) => {
								return !el
									? el
									: ({ ...el, value: Number(el?.value)?.toFixed(4) });
							});
							return (
								<RateTrendView
									key={`${title}-${idx}`}
									color={CHART_COLORS[idx]}
									title={title}
									rate={rate}
									trend={trend}
									subtitles={subtitles}
									tooltips={tooltips}
								/>
							);
						})}
					</Stack>
				}
			/>
		</ContentContainer>
	);
});
