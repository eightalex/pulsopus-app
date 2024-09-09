import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Children, FC, Fragment, RefObject, useMemo, useRef } from "react";

import { RateTrendViewInfo } from "@/components/RateTrendView/RateTrendViewInfo.tsx";
import { IRateTrendViewProps, RateTrendViewInfoProps } from "@/components/RateTrendView/types.ts";
import Typography from "@/components/Typography";
import { useDebounceCallback,useOnClickOutside, useToggle } from "@/hooks";
import { ArrowTriangleDownIcon, ArrowTriangleUpIcon, ISvgIcon } from "@/icons";
import { allStone400 } from "@/theme/palette.ts";

import { RateTrendViewStyled } from "./styled.tsx";

const RenderIcon: FC<{ value: number, colors?: ISvgIcon['color'][] }> = ({ value, colors = ['success', 'error'] }) => {
  const IndexIcon = value > 0 ? ArrowTriangleUpIcon : ArrowTriangleDownIcon;
  const color = value > 0 ? colors[0] : colors[1];
  return <IndexIcon
    color={color as ISvgIcon['color']}
    sx={{ width: 8, height: 8 }}
  />;
};

const randomNum = (min: number, max: number): number => {
  return Math.random() * (max - min + 1) + min;
};

export const RateTrendView: FC<IRateTrendViewProps> = (props) => {
  const {
    title = '',
    subtitles = [],
    trendGrowth = 0,
    rateActivity = 0,
    trendVolatility = randomNum(-12, 9),
    rateVolatility = randomNum(18, 36),
    color = allStone400,
    children,
    headers = [],
    showHeader,
  } = props;
  const wrapperRef = useRef<HTMLDivElement>();
  const [open, toggleOpen, setOpen] = useToggle(false);

  useOnClickOutside<HTMLDivElement>(wrapperRef as RefObject<HTMLDivElement>, () => {
    setOpen(false);
  });

  const debouncedSetOpen = useDebounceCallback(setOpen, 400);

  const renderInfo = useMemo((): RateTrendViewInfoProps[][] => {
    const infoToRender = [
      { label: 'Growth Trend', value: trendGrowth, icon: <RenderIcon value={trendGrowth}/> },
      { label: 'Activity Rate', value: rateActivity },
      {
        label: 'Volatility Trend',
        value: trendVolatility,
        icon: <RenderIcon colors={['primary', 'warning']} value={trendVolatility}/>
      },
      { label: 'Volatility Rate', value: rateVolatility },
    ] as RateTrendViewInfoProps[];

    const SPLIT_NUM = 2;
    return infoToRender.reduce((res, info, i) => {
      const offset = !i ? 0 : Math.floor(i / SPLIT_NUM);
      const vls = res[offset] || [];
      res[offset] = [...vls, info];
      return [...res];
    }, [] as RateTrendViewInfoProps[][]);
  }, [trendGrowth, rateActivity, trendVolatility, rateVolatility]);

  return (
    <RateTrendViewStyled
      ref={wrapperRef as RefObject<HTMLDivElement>}
      spacing={2.5}
      onMouseLeave={() => debouncedSetOpen(false)}
    >
      <Stack spacing={0}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          spacing={3}
        >
          <Typography
            variant="text"
            textTransform="uppercase"
            lineHeight={1}
            sx={{ color }}
          >
            {title}
          </Typography>

          <Collapse in={showHeader} orientation='horizontal'>
            <Stack direction='row' spacing={2} alignItems='center'>
              {Boolean(headers && headers.length) && headers.map((action, i) => (
                <Fragment key={`info-action-${i}`}>
                  {action}
                </Fragment>
              ))}
            </Stack>
          </Collapse>
        </Stack>

        <Stack
          direction='row'
          alignItems='center'
          spacing={1}
          divider={(
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                borderColor: color
              }}
            />
          )}
        >
          {subtitles.map((subtitle) => (
            <Typography
              key={`subtitle-${subtitle}`}
              variant="text"
              sx={{ color, fontSize: 10 }}
            >
              {subtitle}
            </Typography>
          ))}
        </Stack>
      </Stack>

      <Stack
        direction='row'
        spacing={7}
        justifyContent='space-between'
        onClick={() => toggleOpen()}
        onMouseOver={() => setOpen(true)}
        sx={{
          cursor: children ? 'pointer' : 'default'
        }}
      >
        {Boolean(renderInfo.length) && renderInfo.map((infos) => (
          <Stack
            key={infos.map(({ label }) => label).join('-')}
            direction='row'
            spacing={3}
          >
            {infos.map((info) => (
              <RateTrendViewInfo
                key={info.label}
                {...info}
              />
            ))}
          </Stack>
        ))}
      </Stack>

      {Boolean(children) && (
        <Collapse in={open}>
          <Stack
            spacing={3}
            divider={(
              <Divider
                flexItem
                sx={{
                  borderColor: color
                }}
              />
            )}
          >
            <></>
            {Children.map(
              children,
              (child) => Boolean(child) && (
              <Stack>
                {child}
              </Stack>
            ))}
          </Stack>
        </Collapse>
      )}
    </RateTrendViewStyled>
  );
};