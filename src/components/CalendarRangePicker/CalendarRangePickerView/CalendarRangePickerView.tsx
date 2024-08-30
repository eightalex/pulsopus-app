import moment from 'moment';
import { FC, useCallback, useMemo, useState } from 'react';

import Calendar, { TCalendarValue } from '@/components/Calendar';

import { CalendarRangePeriods } from "../CalendarRangePeriods";
import { EPeriodTypes } from '../constants';
import { ICalendarRange, ICalendarRangePickerViewProps } from '../types';
import { useCalendarRangePeriod } from "../useCalendarRangePeriod.tsx";
import { CalendarRangePickerViewInputs } from './CalendarRangePickerViewInputs.tsx';
import { CalendarRangePickerViewWrapper } from './CalendarRangePickerViewWrapper.tsx';

type TDateValue = Date | moment | string | number | null | undefined;

const isEqualsDate = (d1: TDateValue, d2: TDateValue): boolean => {
  return moment(d1).startOf('day').valueOf() === moment(d2).startOf('day').valueOf();
};

const dateValidate = (d?: number) => true;

// TODO: refactor from/to/values types
export const CalendarRangePickerView: FC<ICalendarRangePickerViewProps> = (props) => {
  const { from, to, onSetRange } = props;
  const [hoveredRange, setHoveredRange] = useState<ICalendarRange | null>({ from, to });
  const {
    calendarRangePeriod,
    setCalendarRangePeriod,
    isCustomRangePeriod,
  } = useCalendarRangePeriod({ from, to });

  const calendarValues = useMemo(() => [from, to].filter(t => !!t).map(d => moment(d).toDate()), [from, to]);

  const valueInputFrom = useMemo(() => {
    const d = hoveredRange?.from;
    return dateValidate(d) ? moment(d).toDate() : calendarValues[0];
  }, [hoveredRange?.from, calendarValues]);

  const valueInputTo = useMemo(() => {
    const d = hoveredRange?.to;
    return dateValidate(d) ? moment(d).toDate() : calendarValues[1];
  }, [hoveredRange?.to, calendarValues]);

  const handleHoveredDays = useCallback((days: Array<Date | null>) => {
    // TODO: implement feat
    return;
    const [f, t] = days
      .filter(d => Boolean(d) && moment(d).isValid())
      .map(d => moment(d).valueOf())
      .sort((p, n) => p - n);
    setHoveredRange({ from: f, to: t });
  }, []);

  // const handleChange = useCallback((value) => {
  //   if(calendarRangePeriod !== EPeriodTypes.CUSTOM) {
  //     setCalendarRangePeriod?.(EPeriodTypes.CUSTOM);
  //   }
  //   const values = Array.isArray(value) ? value : [value];
  //   const [f, t] = values
  //     .filter(d => moment(d).isValid())
  //     .map(d => moment(d).valueOf())
  //     .sort((a, b) => a - b);
  //   const calendarRange = { from: f, to: t };
  //   onSetRange?.(calendarRange);
  //   setHoveredRange(null);
  // }, [setCalendarRangePeriod, onSetRange, calendarRangePeriod]);

  const handleSetRange = useCallback((range: ICalendarRange) => {
    if(!range.from || !range.to) return;
    onSetRange?.(range);
  }, [onSetRange]);

  const handleChangeInputs = useCallback((range: ICalendarRange) => {
    setHoveredRange(null);
    setCalendarRangePeriod?.(EPeriodTypes.CUSTOM);
    handleSetRange(range);
  }, [setCalendarRangePeriod, handleSetRange]);

  const handleChangeCalendar = useCallback((values: TCalendarValue) => {
    setHoveredRange(null);
    setCalendarRangePeriod?.(EPeriodTypes.CUSTOM);
  }, [setCalendarRangePeriod]);

  return (
    <CalendarRangePickerViewWrapper
      showCustomInput={isCustomRangePeriod}
      sideComponent={(
        <CalendarRangePeriods
          period={calendarRangePeriod}
          onChangeRange={onSetRange}
          onChangePeriod={setCalendarRangePeriod}
        />
      )}
      customInput={(
        <CalendarRangePickerViewInputs
          from={from || 0}
          to={to || 0}
          onChange={handleChangeInputs}
          isActiveFrom={!isEqualsDate(valueInputFrom, calendarValues[0])}
          isActiveTo={(!isEqualsDate(valueInputTo, calendarValues[1]) &&
            isEqualsDate(valueInputFrom, calendarValues[0]))}
        />
      )}
    >
      <Calendar
        value={calendarValues}
        onChange={handleChangeCalendar}
        onHoveredDays={handleHoveredDays}
        onActiveStartDateChange={() => setCalendarRangePeriod?.(EPeriodTypes.CUSTOM)}
      />
    </CalendarRangePickerViewWrapper>
  );
};
