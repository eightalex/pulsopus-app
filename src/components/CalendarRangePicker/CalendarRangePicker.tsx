import moment from 'moment';
import { FC, memo, useCallback, useEffect, useState } from 'react';

import { getRangeFromPeriod } from '@/components/CalendarRangePicker/helpers';
import { useToggle } from "@/hooks";

import { CalendarRangePickerContainer } from "./CalendarRangePickerContainer";
import { CalendarRangePickerLabel } from './CalendarRangePickerLabel';
import { CalendarRangePickerView } from './CalendarRangePickerView/CalendarRangePickerView';
import { EPeriodTypes, periodList } from './constants';
import { ICalendarRange, ICalendarRangePickerProps } from './types';

const CalendarRangePicker: FC<ICalendarRangePickerProps> = (props) => {
  const {
    onChange,
    range: { from: rangeFrom, to: rangeTo } = {},
  } = props;
  const [from, setFrom] = useState(rangeFrom);
  const [to, setTo] = useState(rangeTo);
  const [period, setPeriod] = useState<EPeriodTypes>(periodList[0].value);
  const [isOpenCalendar, toggleCalendar] = useToggle(false);

  const handleChange = useCallback((range: ICalendarRange) => {
    range.from && setFrom(range.from);
    range.to && setTo(range.to);
    if (range.from && range.to) {
      onChange?.(range);
    }
  }, [onChange]);

  const onSetPeriod = useCallback((nextPeriod: EPeriodTypes) => {
    if (period === nextPeriod) return;
    setPeriod(nextPeriod);
  }, [period]);

  const handleClose = useCallback(() => {
    const vls = [from || rangeFrom, to || rangeTo || from || rangeFrom].filter(t => !!t);
    if (vls.length) {
      const [f, t] = vls;
      if (f !== rangeFrom || t !== rangeTo) {
        handleChange({ from: f, to: t });
      }
    }
    toggleCalendar();
  }, [from, rangeFrom, to, rangeTo, handleChange, toggleCalendar]);

  const updatePeriodValue = useCallback(() => {
    let newPeriod = EPeriodTypes.CUSTOM;
    periodList.forEach(({ value }) => {
      const periodRange = getRangeFromPeriod(value);
      if (!periodRange) return;
      const { from: periodFrom = 0, to: periodTo = 0 } = periodRange;
      const getMoment = (t: number): number => moment(t).startOf('day').valueOf();
      const sFrom = getMoment(rangeFrom || 0);
      const sTo = getMoment(rangeTo || 0);
      const mFrom = getMoment(periodFrom);
      const mTo = getMoment(periodTo);
      if (sFrom !== mFrom || sTo !== mTo) return;
      newPeriod = value;
    });
    setPeriod(newPeriod);
  }, [rangeFrom, rangeTo]);

  useEffect(() => {
    updatePeriodValue();
  }, [updatePeriodValue]);

  useEffect(() => {
    if (!rangeFrom && !rangeTo) {
      const { from: initFrom, to: initTo } = getRangeFromPeriod(EPeriodTypes.MONTH_1);
      handleChange({ from: initFrom, to: initTo });
    }
  }, []);

  useEffect(() => {
    if ((rangeFrom && rangeFrom !== from) || (rangeTo && rangeTo !== to)) {
      handleChange({ from: rangeFrom, to: rangeTo });
    }
  }, [rangeFrom, rangeTo, handleChange, from, to]);

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
