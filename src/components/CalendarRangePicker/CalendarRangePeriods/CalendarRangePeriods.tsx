import { FC, useCallback, useMemo } from "react";

import { EPeriodTypes, periodList } from "@/components/CalendarRangePicker/constants.ts";
import { getPeriodFromRange, getRangeFromPeriod } from "@/components/CalendarRangePicker/helpers.ts";
import { ICalendarRangePeriodsProps } from "@/components/CalendarRangePicker/types.ts";

import CalendarRangePeriodList from "./CalendarRangePeriodList.tsx";
import { CalendarRangePeriodsStyled } from "./styled.tsx";

export const CalendarRangePeriods: FC<ICalendarRangePeriodsProps> = (props) => {
  const {
    options = periodList,
    range,
    onChangeRange,
    onChangePeriod
  } = props;


  const activePeriod = useMemo(() => getPeriodFromRange(range), [range]);

  const checkIsActivePeriodByValue = useCallback((value: EPeriodTypes) => {
    return value === activePeriod;
  }, [activePeriod]);

  const handleClickPeriod = useCallback((value: EPeriodTypes = EPeriodTypes.CUSTOM) => {
    onChangePeriod?.(value);
    if(activePeriod === value) return;
    onChangeRange?.(getRangeFromPeriod(value));
  }, [onChangePeriod, onChangeRange, activePeriod]);

  return (
    <CalendarRangePeriodsStyled>
      <CalendarRangePeriodList
        options={options}
        onClickPeriod={handleClickPeriod}
        checkIsActive={checkIsActivePeriodByValue}
      />
    </CalendarRangePeriodsStyled>
  );
};