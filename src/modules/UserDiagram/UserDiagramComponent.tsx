import { Stack } from '@mui/material';
import { observer } from 'mobx-react';

import { ContentContainer } from "@/components/ContentContainer";
import { RateTrendView } from "@/components/RateTrendView";
import Typography from "@/components/Typography";
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

              const legendColor = idx ? CHART_COLORS[idx] : undefined;

              const tooltips = [
                ['Current Activity', currentRateValue],
                ['Previous Activity', prevRateValue],
                ['Rate', rate],
              ];
              return (
                <RateTrendView
                  key={`${title}-${idx}`}
                  color={legendColor}
                  title={title}
                  subtitles={subtitles}
                  rateActivity={Number(rate)}
                  trendGrowth={trend}
                >
                  <Stack spacing={1}>
                    {tooltips.map((vls, index) => (
                      <Stack direction='row' spacing={1} key={index} flexWrap='wrap'>
                          {vls.map((v, i) => (
                            <Typography
                              variant="text"
                              key={`${i}-${v}`}
                            >
                              {Number(v) ? Number(v).toFixed(2) : v}
                              {!i && <>&#58;</>}
                            </Typography>
                          ))}
                      </Stack>
                    ))}
                  </Stack>
                </RateTrendView>
              );
            })}
          </Stack>
        }
      />
    </ContentContainer>
  );
});
