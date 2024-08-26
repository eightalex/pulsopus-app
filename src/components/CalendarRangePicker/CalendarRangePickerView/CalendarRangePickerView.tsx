import moment from 'moment';
import { FC, useCallback, useMemo, useState } from 'react';

import Calendar from '@/components/Calendar';

import { CalendarRangePeriods } from "../CalendarRangePeriods";
import { EPeriodTypes } from '../constants';
import { ICalendarRange, ICalendarRangePickerViewProps } from '../types';
import { useCalendarRangePeriod } from "../useCalendarRangePeriod.tsx";
import { CalendarRangePickerViewInputs } from './CalendarRangePickerViewInputs.tsx';
import { CalendarRangePickerViewWrapper } from './CalendarRangePickerViewWrapper.tsx';

type TDateValue = Date | moment | string | number | null | undefined;

const dateValidate = (d: Date | moment | string | number | null | undefined): boolean => !!d && moment(d).isValid();

const isEqualsDate = (d1: TDateValue, d2: TDateValue): boolean => {
  return moment(d1).startOf('day').valueOf() === moment(d2).startOf('day').valueOf();
};

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

  const handleChange = useCallback((value) => {
    setCalendarRangePeriod?.(EPeriodTypes.CUSTOM);
    const values = Array.isArray(value) ? value : [value];
    const [f, t] = values
      .filter(d => moment(d).isValid())
      .map(d => moment(d).valueOf())
      .sort((a, b) => a - b);
    const calendarRange = { from: f, to: t };
    onSetRange?.(calendarRange);
    setHoveredRange(null);
  }, [setCalendarRangePeriod, onSetRange]);

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
          from={valueInputFrom}
          to={valueInputTo}
          // onChange={({ from, to }) => handleChange([from, to])}
          onChange={(range) => {
            console.log('onChange => range', range);
          }}
          isActiveFrom={!isEqualsDate(valueInputFrom, calendarValues[0])}
          isActiveTo={(!isEqualsDate(valueInputTo, calendarValues[1]) &&
            isEqualsDate(valueInputFrom, calendarValues[0]))}
        />
      )}
    >
      <Calendar
        value={calendarValues}
        onChange={handleChange}
        onHoveredDays={handleHoveredDays}
        onActiveStartDateChange={() => setCalendarRangePeriod?.(EPeriodTypes.CUSTOM)}
      />
    </CalendarRangePickerViewWrapper>
  );

  // return (
  //   <Stack
  //     ref={containerRef as unknown as RefObject<HTMLDivElement>}
  //     direction="row"
  //     divider={<Divider orientation="vertical" flexItem />}
  //   >
  //     <CalendarRangePickerViewPeriods {...props} offset={offset}/>
  //     <Stack
  //       sx={{
  //         opacity: offset ? 1 : 0,
  //         paddingTop: `${offset}px`,
  //       }}
  //     >
  //       <CalendarRangePeriods range={{ from, to }}/>
  //     </Stack>
  //     <Stack
  //       spacing={0}
  //       sx={({ spacing }) => ({
  //         padding: spacing(6),
  //       })}
  //     >
  //       {isCustomRangePeriod && (
  //         <Stack
  //           direction="row"
  //           spacing={1}
  //           justifyContent="center"
  //           alignItems="center"
  //           mb={5}
  //           maxWidth={234}
  //         >
  //           <DateInput
  //             value={valueInputFrom}
  //             onChange={date => handleChange([date, to])}
  //             active={!isEqualsDate(valueInputFrom, calendarValues[0])}
  //           />
  //           <MinusIcon
  //             sx={({ extendPalette }) => ({
  //               width: 8, color: extendPalette.inputBorderSecondary
  //             })}
  //           />
  //           <DateInput
  //             value={valueInputTo}
  //             onChange={date => handleChange([from, date])}
  //             active={
  //               (!isEqualsDate(valueInputTo, calendarValues[1]) &&
  //                 isEqualsDate(valueInputFrom, calendarValues[0]))}
  //           />
  //         </Stack>
  //       )}
  //       <Calendar
  //         value={calendarValues}
  //         onChange={handleChange}
  //         onHoveredDays={handleHoveredDays}
  //         onActiveStartDateChange={() => onSetPeriod?.(EPeriodTypes.CUSTOM)}
  //       />
  //     </Stack>
  //   </Stack>
  // );
};
