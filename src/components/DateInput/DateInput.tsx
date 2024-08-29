import "react-datepicker/dist/react-datepicker.css";

import moment from 'moment';
import { FC, FocusEvent, memo, useCallback, useMemo } from 'react';

import { MASK, MASK_CHAR, MASK_DIVIDER, MASK_FORMAT } from "@/components/DateInput/constants.ts";
import { DateInputRender } from "@/components/DateInput/DateInputRender.tsx";
import {
  getFormattedMask,
  getValidationDay,
  getValidationMonth,
  getValidationYear,
  isDateValid
} from '@/components/DateInput/helpers';

import { IBeforeChangeStates, IDateInputProps, TInputState } from './types';

const DateInput: FC<IDateInputProps> = (props) => {
  const {
    value: unformattedValue = moment().valueOf(),
    onChange,
    active = false,
    inputMask = MASK,
    valueMask = MASK_FORMAT,
    maskChar = MASK_CHAR,
    maskDivider = MASK_DIVIDER,
    charsFormat = {},
    onFocus,
    onBlur,
    ...restProps
  } = props;

  const format = useMemo(() => getFormattedMask(valueMask, maskDivider).toUpperCase(), [valueMask, maskDivider]);

  const value = useMemo(() => {
    if (typeof unformattedValue === 'number') {
      return moment(unformattedValue).format(format);
    }
    const v = moment(unformattedValue, format, true);
    if (v.isValid()) return v.format(format);
    return moment().format(format);
  }, [unformattedValue, format]);

  const handleChange = useCallback((nextValue: string) => {
    const nV = moment(nextValue, format, true).startOf('d');
    const cV = moment(value, format, true).startOf('d');
    if (!isDateValid(nV) || nV.isSame(cV.valueOf())) return;
    onChange?.(nV.valueOf());
  }, [onChange, value, format]);

  const handleBlur = useCallback((inputValue: string, event: FocusEvent<HTMLInputElement>) => {
    handleChange(inputValue);
    onBlur?.(event);
  }, [onBlur, handleChange]);

  // validate for DD.MM.YYYY input format
  const handleBeforeChangeState = useCallback((states: IBeforeChangeStates): TInputState => {
    const {
      previousState,
      nextState,
      value: inputValue,
    } = states;
    if (!inputValue) return states.nextState;

    const nextValue = nextState.value;
    const prevValue = previousState.value;
    if (prevValue === nextValue) return states.nextState;

    const isFullValue = nextValue
      .replace(maskDivider, '')
      .replace(maskChar, '')
      .trim()
      .length === format
      .replace(maskDivider, '')
      .length;
    if (isFullValue && !moment(nextValue, format, true).isValid()) return states.previousState;

    const position = previousState.selection?.end || 0;
    // DD.MM.YYYY D1-2 = 0-1 | M1-2 = 3-4 | Y1-Y4 = 6-9

    const isLastDayInput = position === 1;
    const isLastMonthInput = position === 4;

    let [d, m, y] = nextValue.split(maskDivider);

    const isInputYear = format.charAt(position) === 'Y';
    const isInputMonth = format.charAt(position) === 'M';
    const isInputDay = format.charAt(position) === 'D';

    if (isInputDay && isLastDayInput) d = getValidationDay(d, m, y);
    if (isInputMonth && isLastMonthInput) m = getValidationMonth(d, m, y);
    if (isInputYear) y = getValidationYear(
      y,
      y.replace(maskChar, '').trim()
    );

    return {
      ...states.nextState,
      value: [d, m, y].join(maskDivider),
    };
  }, [format, maskChar, maskDivider]);

  return (
    <DateInputRender
      value={value}
      onChange={handleChange}
      onChangeBefore={handleBeforeChangeState}
      active={active}
      inputMask={inputMask}
      valueMask={valueMask}
      maskChar={maskChar}
      maskDivider={maskDivider}
      charsFormat={charsFormat}
      onFocus={(_, event) => onFocus?.(event)}
      onBlur={handleBlur}
      {...restProps}
    />
  );
};

export default memo(DateInput);
