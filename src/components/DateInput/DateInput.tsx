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

import { IBeforeChangeStates, IDateInputProps, IValueChangeParams, TInputState, TValue } from './types';

const DateInput: FC<IDateInputProps> = (props) => {
  const {
    value: unformattedValue = moment().valueOf(),
    onChange,
    active = false,
    inputMask= MASK,
    valueMask= MASK_FORMAT,
    maskChar = MASK_CHAR,
    maskDivider = MASK_DIVIDER,
    charsFormat= {},
    onFocus,
    onBlur,
    ...restProps
  } = props;

  const format = useMemo(() => getFormattedMask(valueMask, maskDivider).toUpperCase(), [valueMask, maskDivider]);

  const value = useMemo((): string => {
    if(typeof unformattedValue === 'number') {
      return moment(unformattedValue).format(format);
    }
    const v = moment(unformattedValue, format, true);
    if(v.isValid()) return v.format(format);
    return moment().format(format);
  }, [unformattedValue, format]);

  const handleChange = useCallback((nextValue: string) => {
    const nV = moment(nextValue, format, true).startOf('d');
    const cV = moment(value, format, true).startOf('d');
    if(!isDateValid(nV) || nV.isSame(cV.valueOf())) return;
    onChange?.(nV.valueOf());
  }, [onChange, value, format]);

  const handleBlur = useCallback((inputValue: string, event: FocusEvent<HTMLInputElement>) => {
    handleChange(inputValue);
    onBlur?.(event);
  }, [onBlur, handleChange]);

  // validate for DD.MM.YYYY input format
  const handleBeforeChangeState = useCallback((states: IBeforeChangeStates): TInputState => {
    console.log('handleBeforeChangeState => states', states);
    console.log('states', states);
    return states.nextState;
    const { previousState, nextState, value: inputValue, params } = states;
    // console.log('previousState', previousState);
    // console.log('nextState', nextState);
    // console.log('inputValue', inputValue);
    // console.log('params', params);
    const v = states.nextState.value;
    handleChange(v);
    return states.nextState;
    // return { ...states.nextState, value: states.previousState.value };
  }, [handleChange]);

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
