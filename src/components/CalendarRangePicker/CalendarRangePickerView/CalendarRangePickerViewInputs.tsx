import Stack from "@mui/material/Stack";
import moment from "moment";
import { FC, useCallback, useMemo } from "react";

import { ICalendarRange } from "@/components/CalendarRangePicker";
import { TValue } from "@/components/DateInput";
import DateInput from "@/components/DateInput/DateInput.tsx";
import { MinusIcon } from "@/icons";

interface ICalendarRangePickerViewInputsProps {
  from: number;
  to: number;
  onChangeFrom?: (from: number) => void;
  onChangeTo?: (to: number) => void;
  onChange?: (range: ICalendarRange) => void;
  isActiveFrom?: boolean;
  isActiveTo?: boolean;
}

export const CalendarRangePickerViewInputs: FC<ICalendarRangePickerViewInputsProps> = (props) => {
  const {
    from: initFrom,
    to: initTo,
    onChangeFrom,
    onChangeTo,
    onChange,
    isActiveFrom = false,
    isActiveTo = false,
  } = props;

  const from = useMemo(() => moment(initFrom).startOf('d').valueOf(), [initFrom]);
  const to = useMemo(() => moment(initTo).endOf('d').valueOf(), [initTo]);

  const handleChange = useCallback((range: ICalendarRange) => {
    if(range.from && range.from !== from) onChangeFrom?.(range.from);
    if(range.to && range.to !== to) onChangeTo?.(range.to);
    onChange?.(range);
  }, [from, to, onChangeFrom, onChangeTo, onChange]);

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      alignItems="center"
      mb={5}
      maxWidth={234}
    >
      <DateInput
        value={from}
        onChange={(f) => handleChange({ from: f, to })}
        active={isActiveFrom}
      />
      <MinusIcon
        sx={({ extendPalette }) => ({
          width: 8, color: extendPalette.inputBorderSecondary
        })}
      />
      <DateInput
        value={to}
        onChange={(t) => handleChange({ from, to: t })}
        active={isActiveTo}
      />
    </Stack>
  );
};