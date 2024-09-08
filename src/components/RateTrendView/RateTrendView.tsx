import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from "@mui/material/Stack";
import { FC, ReactNode, RefObject, useMemo, useRef, useState } from "react";

import { RateTrendViewInfo } from "@/components/RateTrendView/RateTrendViewInfo.tsx";
import { IRateTrendViewProps, RateTrendViewInfoProps } from "@/components/RateTrendView/types.ts";
import Typography, { TTypographyColorType } from "@/components/Typography";
import { CHART_COLORS } from "@/constants/chart.ts";
import { useOnClickOutside } from "@/hooks";
import { ArrowDownIcon, ArrowUpIcon, ISvgIcon } from "@/icons";

import { RateTrendViewStyled } from "./styled.tsx";

interface ITooltipParam {
  value?: string | number;
  label?: string;
}

interface IRateTrandViewProps {
  title?: string;
  children?: ReactNode;
  subtitles?: string[];
  rate?: number;
  trend?: number;
  hideRate?: boolean;
  hideTrend?: boolean;
  tooltips?: Array<ITooltipParam | null>;
}

const getColorByTrend = (trend = 0): TTypographyColorType => {
  const res = trend === 0
    ? 'primary'
    : trend > 0 ? 'success' : 'error';
  return res as TTypographyColorType;
};

export const RateTrendView: FC<IRateTrendViewProps> = (props) => {
  const {
    title = '',
    subtitles = [],
    trendGrowth,
    rateActivity,
    trendVolatility,
    rateVolatility,
    color= CHART_COLORS[0],
  } = props;
  const wrapperRef = useRef<HTMLDivElement>();
  const menuAnchorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useOnClickOutside<HTMLDivElement>(wrapperRef as RefObject<HTMLDivElement>, (e) => setHovered(false));
  const IndexIcon = trendGrowth > 0 ? ArrowUpIcon : ArrowDownIcon;
  // const color = getColorByTrend(trend);
  // const renderValues = useMemo(() => {
  //     const res = [];
  //     if(!hideTrend) {
  //         res.push({ value: trend, label: 'Growth Trend' });
  //     }
  //     if(!hideRate) {
  //         res.push({ value: rate, label: 'Activity Rate' });
  //     }
  //     return res;
  // }, [trend, rate, hideTrend, hideRate]);

  // const renderTooltips: ITooltipParam[][] = useMemo(() => {
  //     let j = 0;
  //     return tooltips.reduce((acc, t = {}) => {
  //         const hasData = [t?.value, t?.label].some(v => typeof v !== 'undefined');
  //         if(!t || !hasData) {
  //             j++;
  //             return acc;
  //         }
  //         const ts = acc[j] || [];
  //         ts.push(t);
  //         acc[j] = ts;
  //         return acc;
  //     }, [] as ITooltipParam[][]);
  // }, [tooltips]);

  const renderInfo = useMemo(() => {
    return [
      { label: 'Growth Trend', value: trendGrowth, icon: <IndexIcon color={color as ISvgIcon['color']}/> },
      { label: 'Growth Trend', value: trendGrowth, icon: <IndexIcon color={color as ISvgIcon['color']}/> },
      { label: 'Growth Trend', value: trendGrowth, icon: <IndexIcon color={color as ISvgIcon['color']}/> },
      { label: 'Growth Trend', value: trendGrowth, icon: <IndexIcon color={color as ISvgIcon['color']}/> },
    ] as RateTrendViewInfoProps[];
  }, [trendGrowth, IndexIcon]);

  return (
    <RateTrendViewStyled
      ref={wrapperRef as RefObject<HTMLDivElement>}
      spacing={2.5}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Stack
        direction='row'
        alignItems='center'
        spacing={1}
        flexWrap='wrap'
      >
        <Typography
          variant="text"
          textTransform="uppercase"
          sx={{ color }}
        >
          {title}
        </Typography>
        <Stack direction='row' alignItems='center'>
          {subtitles.map((subtitle, index) => (
            <Stack
              key={`${index}-${subtitle}`}
              direction={'row'}
              alignItems='center'
              spacing={1}
            >
              <Typography
                variant="text"
                sx={{ color }}
              >
                /
              </Typography>
              <Typography
                variant="text"
                sx={{ color, fontSize: 10 }}
              >
                {subtitle}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack direction='row'>
        {renderInfo.map((p) => (
          <RateTrendViewInfo
            key={p.label}
            {...p}
          />
        ))}
      </Stack>

    </RateTrendViewStyled>
  );
};