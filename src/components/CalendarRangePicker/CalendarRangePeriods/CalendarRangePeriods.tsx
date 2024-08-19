import { FC } from "react";

import { periodList } from "@/components/CalendarRangePicker/constants.ts";
import { ICalendarRangePeriodsProps } from "@/components/CalendarRangePicker/types.ts";

import CalendarRangePeriodList from "./CalendarRangePeriodList.tsx";
import { CalendarRangePeriodsStyled } from "./styled.tsx";


export const CalendarRangePeriods: FC<ICalendarRangePeriodsProps> = (props) => {
  const {
    options = periodList,
    range,
    onChange,
  } = props;
  console.log('range', range);
  console.log('onChange', onChange);
  return (
    <CalendarRangePeriodsStyled>
      <CalendarRangePeriodList options={options} />
    </CalendarRangePeriodsStyled>
  );
};