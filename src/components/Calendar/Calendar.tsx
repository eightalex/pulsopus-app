import './calendar.scss';

import Stack from '@mui/material/Stack';
import moment from 'moment';
import {
  FC,
  memo,
  MouseEvent,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import ReactCalendar from 'react-calendar';

import {
  CalendarNext2Icon,
  CalendarNextIcon,
  CalendarPrev2Icon,
  CalendarPrevIcon
} from '@/components/Calendar/CalendarNavIcons';
import {
  DEFAULT_CALENDAR_LOCALE, DEFAULT_DETAIL_VIEW,
  findAndRoundedActiveElements,
  getHoveredElementsValue, MIN_DETAIL_VIEW
} from '@/components/Calendar/helpers';
import { ICalendarProps, TCalendarPropsOnChangeValue, TValuePiece } from '@/components/Calendar/types';
import Typography from '@/components/Typography';
import { useEventListener } from '@/hooks';

const Calendar: FC<ICalendarProps> = (props) => {
  const {
    value: initValue,
    onChange,
    onActiveStartDateChange,
    onClickDay,
    onHoveredDays,
    ...restProps
  } = props;
  const calendarRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLDivElement>();

  const value = useMemo((): [Date, Date] => {
    const v: [TValuePiece, TValuePiece] = Array.isArray(initValue)
      ? [initValue[0], initValue[initValue.length - 1]]
      : [initValue, initValue];
    return v
      .map((d) => {
        return moment(d).isValid()
          ? moment(d).toDate()
          : moment().toDate();
      }) as [Date, Date];
  }, [initValue]);

  const [activeStartValue, setActiveStartValue] = useState<Date | undefined>(value[0]);
  const [isStartedRange, setIsStartedRange] = useState(false);

  const handleChange = useCallback((value: TCalendarPropsOnChangeValue, event: MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    event?.stopPropagation();
    if(!value) return;
    const values = Array.isArray(value)
      ? [value[0], value[value.length - 1]]
      : [value, value];
    const result = values.map(d => moment(d).valueOf());
    onChange?.(result);
  }, [onChange]);

  const handleHoveredDays = useCallback((values: Array<TValuePiece | undefined>) => {
    onHoveredDays?.(
      values.map(d => {
        if (!d || !moment(d).isValid()) return null;
        return moment(d).valueOf();
      })
    );
  }, [onHoveredDays]);

  const getHoveredValues = useCallback(() => {
    if (!inputRef || !inputRef.current) return;
    const wrapper = inputRef.current;
    const day = getHoveredElementsValue(wrapper);
    if (!day) return;
    if (!isStartedRange) {
      handleHoveredDays([day, null]);
      return;
    }
    const values = [activeStartValue, day]
      .filter(d => !!d && moment(d).isValid())
      .sort((p, n) => moment(p).valueOf() - moment(n).valueOf());
    handleHoveredDays(values);
  }, [isStartedRange, handleHoveredDays, activeStartValue]);

  const updateElements = useCallback(() => {
    if (!inputRef || !inputRef.current) return;
    findAndRoundedActiveElements(inputRef.current);
    getHoveredValues();
  }, [inputRef, getHoveredValues]);

  useEventListener('mousemove', updateElements, inputRef as RefObject<HTMLDivElement>, true);

  useEventListener('mouseout', () => onHoveredDays?.([]), inputRef as RefObject<HTMLDivElement>, true);

  useLayoutEffect(() => {
    updateElements();
  }, [updateElements]);

  useEffect(() => {
    setActiveStartValue(value[0]);
  }, [value]);

  return (
    <ReactCalendar
      ref={calendarRef}
      inputRef={inputRef as RefObject<HTMLDivElement>}
      className="calendar"
      value={value}
      defaultValue={value}
      defaultActiveStartDate={value[0]}
      activeStartDate={activeStartValue}
      allowPartialRange
      goToRangeStartOnSelect
      showNavigation
      showDoubleView={false}
      showNeighboringMonth
      showNeighboringCentury
      selectRange
      returnValue="range"
      locale={DEFAULT_CALENDAR_LOCALE}
      defaultView={DEFAULT_DETAIL_VIEW}
      minDetail={MIN_DETAIL_VIEW}
      // maxDate={moment().endOf('year').toDate()}
      // onDrillUp={console.log}
      // onDrillDow={console.log}
      // onClickDay={console.log}
      // onViewChange={console.log}
      onActiveStartDateChange={(args) => {
        updateElements();
        onActiveStartDateChange?.(args);
        setActiveStartValue(undefined);
      }}
      onClickDay={(value: Date, event: MouseEvent<HTMLButtonElement>) => {
        setIsStartedRange(prev => !prev);
        onClickDay?.(value, event);
      }}
      onChange={(params, event) => {
        updateElements();
        handleChange(params, event);
      }}
      formatShortWeekday={(_, date) =>
        moment(date)
          .format('dd')
          .toString()
          .split('')[0]
      }
      formatMonth={(_, date) => moment(date).format('MMM')}
      // formatMonthYear={(_, date) => moment(date).format('MMM YYYY')}
      prevAriaLabel="prev-month"
      nextAriaLabel="next-month"
      prev2AriaLabel="prev-year"
      next2AriaLabel="next-year"
      prevLabel={<CalendarPrevIcon/>}
      prev2Label={<CalendarPrev2Icon/>}
      nextLabel={<CalendarNextIcon/>}
      next2Label={<CalendarNext2Icon/>}
      navigationLabel={({ label }) => (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          {label.split(' ').map((t) => (
            <Typography
              key={t}
              variant="text"
              fontSize={15}
              textTransform="uppercase"
            >
              {t}
            </Typography>
          ))}
        </Stack>
      )}
      {...restProps}
    />
  );
};

export default memo(Calendar);
