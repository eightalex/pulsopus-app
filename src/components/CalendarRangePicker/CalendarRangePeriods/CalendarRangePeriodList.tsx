import Stack from "@mui/material/Stack";
import { FC } from "react";

import { ICalendarRangePeriodListProps } from "@/components/CalendarRangePicker/types.ts";

import { CalendarRangePeriodItem } from "./CalendarRangePeriodItem.tsx";
export const CalendarRangePeriodList: FC<ICalendarRangePeriodListProps> = (props) => {
  const {
    options = [],
    checkIsActive = () => false,
    onClick
  } = props;
  return (
    <Stack
      sx={{
        width: 'auto',
        height: 'auto',
      }}
    >
      {options.map(({ label, value }) => (
        <CalendarRangePeriodItem
          key={`${label}-${value}`}
          onClick={onClick}
          label={label}
          value={value}
          isActive={Boolean(checkIsActive?.(value))}
        />
      ))}
    </Stack>
  );
};

export default CalendarRangePeriodList;