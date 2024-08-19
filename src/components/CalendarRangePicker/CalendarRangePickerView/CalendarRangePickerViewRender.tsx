import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import moment from 'moment';
import { FC, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Calendar from '@/components/Calendar';
import DateInput from '@/components/DateInput';
import { MinusIcon } from '@/icons';

import { CalendarRangePeriods } from "../CalendarRangePeriods";
import { EPeriodTypes } from '../constants';
import { ICalendarRange, ICalendarRangePickerViewProps } from '../types';
import { CalendarRangePickerViewPeriods } from './CalendarRangePickerViewPeriods';

type TDateValue = Date | moment | string | number | null | undefined;

const dateValidate = (d: Date | moment | string | number | null | undefined): boolean => !!d && moment(d).isValid();

const isEqualsDate = (d1: TDateValue, d2: TDateValue): boolean => {
  return moment(d1).startOf('day').valueOf() === moment(d2).startOf('day').valueOf();
};

export const CalendarRangePickerViewRender: FC<ICalendarRangePickerViewProps> = (props) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const contentRef = useRef<HTMLDivElement>();
  const [offset, setOffset] = useState(0);

  const calculatePeriodTopOffset = useCallback(() => {
    if (!wrapperRef || !wrapperRef.current) return;
    const view = wrapperRef.current?.querySelector('.react-calendar__navigation');
    if (!view) return;
    const parentRect = wrapperRef.current?.getBoundingClientRect();
    const childRect = view.getBoundingClientRect();
    const offset = childRect.y - parentRect.y;
    const pd = 10;
    setOffset(offset - pd);
  }, [wrapperRef, showCustomInputs]);

  useEffect(() => {
    calculatePeriodTopOffset();
  }, [calculatePeriodTopOffset]);

  console.log('offset', offset);

  return (
    <Stack
      ref={wrapperRef as unknown as RefObject<HTMLDivElement>}
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
    >
      <CalendarRangePickerViewPeriods {...props} offset={offset}/>
      <Stack
        sx={{
          opacity: offset ? 1 : 0,
          paddingTop: `${offset}px`,
        }}
      >
        <CalendarRangePeriods range={{ from, to }}/>
      </Stack>
      <Stack
        spacing={0}
        sx={({ spacing }) => ({
          padding: spacing(6),
        })}
      >
        {showCustomInputs && (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            mb={5}
            maxWidth={234}
          >
            <DateInput
              value={valueInputFrom}
              onChange={date => handleChange([date, to])}
              active={!isEqualsDate(valueInputFrom, calendarValues[0])}
            />
            <MinusIcon
              sx={({ extendPalette }) => ({
                width: 8, color: extendPalette.inputBorderSecondary
              })}
            />
            <DateInput
              value={valueInputTo}
              onChange={date => handleChange([from, date])}
              active={
                (!isEqualsDate(valueInputTo, calendarValues[1]) &&
                  isEqualsDate(valueInputFrom, calendarValues[0]))}
            />
          </Stack>
        )}
        <Calendar
          value={calendarValues}
          onChange={handleChange}
          onHoveredDays={handleHoveredDays}
          onActiveStartDateChange={() => onSetPeriod?.(EPeriodTypes.CUSTOM)}
        />
      </Stack>
    </Stack>
  );
};
