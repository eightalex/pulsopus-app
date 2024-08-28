import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { FC, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from 'react';

interface ICalendarRangePickerViewWrapperProps {
  sideComponent?: ReactNode;
  showCustomInput?: boolean;
  customInput: ReactNode;
  children: ReactNode;
}

const PADDING_OFFSET = 12;

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
    const offsetValue = Math.abs(parentRect.top - childRect.top) - PADDING_OFFSET;
    setOffset(offsetValue);
  }, [wrapperRef, contentRef]);

  useEffect(() => {
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
        {Boolean(showCustomInput && customInput) && customInput}
        <Stack ref={contentRef as unknown as RefObject<HTMLDivElement>}>
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
};
