import { FC, useCallback } from 'react';

import { ICalendarRangePeriodItemProps } from "@/components/CalendarRangePicker/types.ts";

import { CalendarRangePeriodItemStyled, CalendarRangePeriodItemWrapperStyled } from "./styled.tsx";

export const CalendarRangePeriodItem: FC<ICalendarRangePeriodItemProps> = (props) => {
  const {
    label = '',
    value,
    onClick,
    isActive = false
  } = props;

  const handleClick = useCallback(() => {
    onClick?.(value);
  }, [value, onClick]);

  return (
    <CalendarRangePeriodItemWrapperStyled
      onClick={handleClick}
    >
      <CalendarRangePeriodItemStyled active={isActive}>
        {label}
      </CalendarRangePeriodItemStyled>
    </CalendarRangePeriodItemWrapperStyled>
  );
};