import Stack from "@mui/material/Stack";
import moment from "moment";
import { FC, useCallback, useMemo } from "react";

import { ICalendarRange } from "@/components/CalendarRangePicker";
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
    if(!range?.from || !range?.to) return;
    const [f, t] = Object.values(range)
      .map(d => moment(d).startOf('d').valueOf());
    if(f !== from) onChangeFrom?.(f);
    if(t !== to) onChangeTo?.(t);
    onChange?.({ from: f, to: t });
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