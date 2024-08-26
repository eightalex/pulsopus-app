import { Dispatch, SetStateAction, useLayoutEffect, useMemo, useState } from "react";

import { ICalendarRange } from "@/components/Calendar/types.ts";
import { EPeriodTypes } from "@/components/CalendarRangePicker/constants.ts";
import { getPeriodFromRange } from "@/components/CalendarRangePicker/helpers.ts";

export const useCalendarRangePeriod = (
  range: ICalendarRange
): {
  calendarRangePeriod: EPeriodTypes,
  setCalendarRangePeriod: Dispatch<SetStateAction<EPeriodTypes>>,
  isCustomRangePeriod: boolean;
} => {
  const [calendarRangePeriod, setCalendarRangePeriod] = useState<EPeriodTypes>(EPeriodTypes.CUSTOM);

  const isCustomRangePeriod = useMemo(
    (): boolean => calendarRangePeriod === EPeriodTypes.CUSTOM
    , [calendarRangePeriod]);

  useLayoutEffect(() => {
    setCalendarRangePeriod(getPeriodFromRange(range) || EPeriodTypes.CUSTOM);
  }, []);

  return {
    calendarRangePeriod,
    setCalendarRangePeriod,
    isCustomRangePeriod,
  };
};