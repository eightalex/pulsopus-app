import { Box, Stack } from '@mui/material';
import { FC, ReactNode, useCallback, useRef } from 'react';

import { CalendarRangePickerDropdown } from './CalendarRangePickerDropdown.tsx';

interface ICalendarRangePickerContainerProps {
  label: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarRangePickerContainer: FC<ICalendarRangePickerContainerProps> = (props) => {
  const { label, children, isOpen, onClose } = props;
  const targetRef = useRef<HTMLDivElement>();
  const handleClose = useCallback((e: MouseEvent) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    e && e.stopImmediatePropagation();
    if(e?.target && targetRef.current?.contains(e.target as Node)) return;
    onClose?.();
  }, [onClose, targetRef]);

  return (
    <Stack direction="row" position={'relative'}>
      <Box ref={targetRef} sx={{ height: 'fit-content' }}>
        {label}
      </Box>
      {isOpen && (
        <CalendarRangePickerDropdown
          onClose={handleClose}
          targetRef={targetRef}
        >
          {children}
        </CalendarRangePickerDropdown>
      )}
    </Stack>
  );
};