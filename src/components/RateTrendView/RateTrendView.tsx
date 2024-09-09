import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import {
  Children,
  FC,
  Fragment,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import { RateTrendViewInfo } from "@/components/RateTrendView/RateTrendViewInfo.tsx";
import { IRateTrendViewProps, RateTrendViewInfoProps } from "@/components/RateTrendView/types.ts";
import Typography from "@/components/Typography";
import { useDebounceCallback, useOnClickOutside, useToggle } from "@/hooks";
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

const randomTrendVolatility = randomNum(-12, 9);
const randomRateVolatility = randomNum(18, 36);

export const RateTrendView: FC<IRateTrendViewProps> = (props) => {
  const {
    title = '',
    subtitles = [],
    trendGrowth = 0,
    rateActivity = 0,
    trendVolatility = randomTrendVolatility,
    rateVolatility = randomRateVolatility,
    color = allStone400,
    children,
    headers = [],
    showHeader,
  } = props;
  const wrapperRef = useRef<HTMLDivElement>();
  const infoContainerRef = useRef<HTMLDivElement>();

  const [open, toggleOpen, setOpen] = useToggle(false);
  const [isWrapped, setIsWrapped] = useState(false);

  useOnClickOutside<HTMLDivElement>(wrapperRef as RefObject<HTMLDivElement>, () => {
    setOpen(false);
  });

  const handleCheckFlexWrap = useCallback(() => {
    if (!infoContainerRef?.current) return;
    const el = infoContainerRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      const container = entries[0].target;
      const firstItem = container.children[0];
      const secondItem = container.children[1];

      const isWrappedNow = firstItem.getBoundingClientRect().top !== secondItem.getBoundingClientRect().top;
      setIsWrapped(isWrappedNow);
    });

    resizeObserver.observe(el);
  }, [infoContainerRef]);

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

  useEffect(() => {
    if (infoContainerRef?.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const container = entries[0].target;
        const firstItem = container.children[0];
        const secondItem = container.children[1];

        const isWrappedNow = firstItem.getBoundingClientRect().top !== secondItem.getBoundingClientRect().top;
        setIsWrapped(isWrappedNow);
      });

      const container = infoContainerRef.current;
      resizeObserver.observe(container);

      return () => resizeObserver.disconnect();
    }
  }, [handleCheckFlexWrap]);

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
        ref={infoContainerRef as RefObject<HTMLDivElement>}
        direction='row'
        justifyContent='space-between'
        onClick={() => toggleOpen()}
        onMouseOver={() => setOpen(true)}
        sx={{
          cursor: children ? 'pointer' : 'default',
          flexWrap: 'wrap',
          flexShrink: 1,
          gap: isWrapped ? 4 : 'unset',
        }}
      >
        {Boolean(renderInfo.length) && renderInfo.map((infos) => (
          <Stack
            key={infos.map(({ label }) => label).join('-')}
            direction='row'
            spacing={isWrapped ? 8 : 3}
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
            flexWrap='wrap'
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
                <Stack
                  sx={{
                    overflow: 'auto',
                    cursor: 'default',
                    flexWrap: 'wrap'
                  }}
                >
                  {child}
                </Stack>
              ))}
          </Stack>
        </Collapse>
      )}
    </RateTrendViewStyled>
  );
};