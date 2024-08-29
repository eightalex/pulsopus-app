import moment from 'moment';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';

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
    if(!range  || !range.from || !range.to) return;
    onChange?.(range);
  }, [onChange]);

  const handleClose = useCallback(() => {
    // const vls = [from || rangeFrom, to || rangeTo || from || rangeFrom].filter(t => !!t);
    // if (vls.length) {
    //   const [f, t] = vls;
    //   if (f !== rangeFrom || t !== rangeTo) {
    //     handleChange({ from: f, to: t });
    //   }
    // }
    setOpenCalendar(false);
  // }, [from, rangeFrom, to, rangeTo, handleChange, setOpenCalendar]);
  }, [from, to, handleChange, setOpenCalendar]);

  // useEffect(() => {
  //   if (!rangeFrom && !rangeTo) {
  //     const { from: initFrom, to: initTo } = getRangeFromPeriod(EPeriodTypes.MONTH_1);
  //     handleChange({ from: initFrom, to: initTo });
  //   }
  // }, []);
  //
  // useEffect(() => {
  //   if ((rangeFrom && rangeFrom !== from) || (rangeTo && rangeTo !== to)) {
  //     handleChange({ from: rangeFrom, to: rangeTo });
  //   }
  // }, [rangeFrom, rangeTo, handleChange, from, to]);

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
