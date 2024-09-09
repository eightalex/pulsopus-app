import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { observer } from "mobx-react";
import { FC, useMemo } from "react";

import { RateTrendView } from "@/components/RateTrendView";
import Typography from "@/components/Typography";
import { useStores } from "@/hooks";


const RenderViewInfo: FC<{ render: Array<(string | number | undefined)[]> }> = ({ render }) => {
  return (
    <Stack spacing={1}>
      {render.map((vls, idx) => (
        <Stack direction='row' spacing={1} key={`view-info-${idx}`} flexWrap='wrap'>
          {vls.map((v, i, arr) => (
            <Typography
              variant="text"
              key={`${i}-${v}`}
            >
              {Number(v) ? Number(v).toFixed(2) : v}
              {!i && arr.length > 1 && <>&#58;</>}
            </Typography>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export const PeopleDynamicViewRateTrend = observer(() => {
  const {
    rootStore: {
      peopleDynamicStore: {
        department,
        showAbsoluteData,
        onToggleShowAbsoluteData,
        departmentActivityData,
        absoluteActivityData,
      },
    }
  } = useStores();

  const isCompanyRender = useMemo(() => {
    return department?.value === 'COMPANY';
  }, [department]);

  const renderCompanyTooltip = useMemo(() => {
    return [
      ['Company'],
      ['Current Activity', absoluteActivityData.currentDepartmentActivity],
      ['Previous Activity', absoluteActivityData.prevDepartmentActivity],
      ['Trend', absoluteActivityData.trend],
    ];
  }, [absoluteActivityData]);

  const renderDepartmentTooltips = useMemo(() => {
    return [
      ['Department', department?.label],
      ['Current Activity', departmentActivityData.currentDepartmentActivity],
      ['Previous Activity', departmentActivityData.prevDepartmentActivity],
      ['Rate', departmentActivityData.rate],
      ['Trend', departmentActivityData.trend],
    ];
  }, [departmentActivityData, department]);

  return (
    <Stack spacing={isCompanyRender ? 0 : 6}>
      <RateTrendView
        title={department?.label || ''}
        rateActivity={departmentActivityData.rate}
        trendGrowth={departmentActivityData.trend}
        headers={[
          <Switch
            checked={showAbsoluteData}
            onChange={onToggleShowAbsoluteData}
            name="absolute.data.switch"
          />
        ]}
        showHeader={!isCompanyRender}
      >
        <RenderViewInfo render={renderCompanyTooltip} />
        {!isCompanyRender && (
          <RenderViewInfo render={renderDepartmentTooltips} />
        )}
      </RateTrendView>
    </Stack>
  );

});