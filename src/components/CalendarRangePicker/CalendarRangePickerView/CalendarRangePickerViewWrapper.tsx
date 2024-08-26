import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { FC, ReactNode, RefObject, useCallback, useLayoutEffect, useRef, useState } from 'react';

interface ICalendarRangePickerViewWrapperProps {
  sideComponent?: ReactNode;
  showCustomInput?: boolean;
  customInput: ReactNode;
  children: ReactNode;
}

export const CalendarRangePickerViewWrapper: FC<ICalendarRangePickerViewWrapperProps> = (props) => {
  const {
    sideComponent,
    showCustomInput= false,
    customInput,
    children } = props;
  const wrapperRef = useRef<HTMLDivElement>();
  const contentRef = useRef<HTMLDivElement>();
  const [offset, setOffset] = useState(0);

  const calculatePeriodTopOffset = useCallback(() => {
    if (!wrapperRef || !wrapperRef.current || !contentRef || !contentRef.current) return;
    const parentRect = wrapperRef.current?.getBoundingClientRect();
    const childRect = contentRef.current?.getBoundingClientRect();
    const offset = childRect.y - parentRect.y;
    const pd = 12;
    setOffset(offset - pd);
  }, [wrapperRef, contentRef]);

  useLayoutEffect(() => {
    calculatePeriodTopOffset();
  }, [calculatePeriodTopOffset, showCustomInput]);

  return (
    <Stack
      ref={wrapperRef as unknown as RefObject<HTMLDivElement>}
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
    >
      {Boolean(sideComponent) && (
        <Stack
          sx={{
            opacity: offset ? 1 : 0,
            paddingTop: `${offset}px`,
          }}
        >
          {sideComponent}
        </Stack>
      )}
      <Stack
        spacing={0}
        sx={({ spacing }) => ({
          padding: spacing(6),
        })}
      >
        {Boolean(showCustomInput) && Boolean(customInput) && customInput}
        <Stack ref={contentRef as unknown as RefObject<HTMLDivElement>}>
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
};
