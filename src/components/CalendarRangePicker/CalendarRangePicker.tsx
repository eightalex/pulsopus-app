import moment from 'moment';
import { FC, memo, useCallback } from 'react';

import { useToggle } from "@/hooks";

import { CalendarRangePickerContainer } from "./CalendarRangePickerContainer";
import { CalendarRangePickerLabel } from './CalendarRangePickerLabel';
import { CalendarRangePickerView } from './CalendarRangePickerView/CalendarRangePickerView';
import { ICalendarRange, ICalendarRangePickerProps } from './types';

const CalendarRangePicker: FC<ICalendarRangePickerProps> = (props) => {
  const {
    onChange,
    range: {
      from,
      to
    } = {
      from: moment().startOf('d').valueOf(),
      to: moment().endOf('d').valueOf(),
    },
  } = props;
  const [isOpenCalendar, toggleCalendar, setOpenCalendar] = useToggle(false);

  const handleChange = useCallback((range: ICalendarRange) => {
    if(!range?.from || !range?.to) return;
    onChange?.(range);
  }, [onChange]);

  const handleClose = useCallback(() => {
    setOpenCalendar(false);
  }, [setOpenCalendar]);

  return (
    <CalendarRangePickerContainer
      isOpen={isOpenCalendar}
      onClose={handleClose}
      label={
        <CalendarRangePickerLabel
          onClick={toggleCalendar}
          from={from}
          to={to}
        />
      }
    >
      <CalendarRangePickerView
        from={from}
        to={to}
        onClose={handleClose}
        onSetRange={handleChange}
      />
    </CalendarRangePickerContainer>
  );
};

export default memo(CalendarRangePicker);
