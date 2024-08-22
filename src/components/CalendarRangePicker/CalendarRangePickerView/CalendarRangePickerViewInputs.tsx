import Stack from "@mui/material/Stack";
import moment from "moment";
import { FC, useCallback, useMemo } from "react";

import { ICalendarRange } from "@/components/CalendarRangePicker";
import { TValue } from "@/components/DateInput";
import DateInput from "@/components/DateInput/DateInput.tsx";
import { MinusIcon } from "@/icons";

//
// const dateValidate = (d: Date | moment | string | number | null | undefined): boolean => !!d && moment(d).isValid();
//
// const isEqualsDate = (d1: TDateValue, d2: TDateValue): boolean => {
//   return moment(d1).startOf('day').valueOf() === moment(d2).startOf('day').valueOf();
// };

interface ICalendarRangePickerViewInputsProps {
  from: TValue;
  to: TValue;
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

  const handleChangeFrom = useCallback((date: number) => {
    const v = moment(date).startOf('d').valueOf();
    onChangeFrom?.(v);
    onChange?.({
      from: v,
      to
    });
  }, [onChange, onChangeFrom, to]);

  const handleChangeTo = useCallback((date: number) => {
    const v = moment(date).endOf('d').valueOf();
    onChangeTo?.(v);
    onChange?.({
      from,
      to: v
    });
  }, [onChange, onChangeTo, from]);

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
        onChange={handleChangeFrom}
        active={isActiveFrom}
      />
      <MinusIcon
        sx={({ extendPalette }) => ({
          width: 8, color: extendPalette.inputBorderSecondary
        })}
      />
      <DateInput
        value={to}
        onChange={handleChangeTo}
        active={isActiveTo}
      />
    </Stack>
  );
};