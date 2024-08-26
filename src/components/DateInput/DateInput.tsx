import "react-datepicker/dist/react-datepicker.css";

import moment from 'moment';
import { FC, FocusEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';

import { MASK, MASK_CHAR, MASK_DIVIDER } from "@/components/DateInput/constants.ts";
import { DateInputRender } from "@/components/DateInput/DateInputRender.tsx";
import {
  getFormattedMask,
  getValidationDay,
  getValidationMonth,
  getValidationYear, isDateValid
} from '@/components/DateInput/helpers';

import { IBeforeChangeStates, IDateInputProps, IValueChangeParams, TInputState, TValue } from './types';

const DateInput: FC<IDateInputProps> = (props) => {
  const {
    value: initValue,
    onChange,
    active = false,
    maskDivider = MASK_DIVIDER,
    maskChar = MASK_CHAR,
    mask: initMask = MASK,
    formats = {},
    onFocus,
    onBlur,
    ...restProps
  } = props;

  const mask = useMemo(() => getFormattedMask(initMask, maskDivider).toUpperCase(), [initMask, maskDivider]);

  const value = useMemo(() => moment(initValue).format(mask), [initValue, mask]);
  console.log('initValue', initValue);
  console.log('value', value);

  const [currentState, setCurrentState] = useState(moment(initValue).format(mask));

  const handleChange = useCallback((nextValue: string) => {
    console.log('handleChange => nextValue', nextValue);
    const nV = moment(nextValue, mask, true).startOf('d');
    const v = moment(value, mask, true).startOf('d');
    if(nV.isSame(v.valueOf()) || !isDateValid(nV.valueOf())) return;
    onChange?.(nV.valueOf());
  }, [onChange, mask, value]);

  const beforeMaskedValueChange = useCallback((newState: IValueChangeParams, prevState: IValueChangeParams, userInput: string): IValueChangeParams => {
    const returnedState = {
      value: newState.value,
      selection: newState.selection,
    };
    if (newState.value === prevState.value || !userInput) return returnedState;
    const vs = newState.value.split('.').map(n => !Number.isNaN(Number(n)) ? n : null);
    const [d, m, y] = vs;
    const day = getValidationDay(d, m, y);
    const month = getValidationMonth(d, m, y);
    const year = getValidationYear(d, m, y);
    const dd = [day, month, year].join(maskDivider);
    const isValid = moment([day, month, year].join(maskDivider), mask, true).isValid();

    const isOver = dd.length === mask.length;

    if (isOver && !isValid) return prevState;
    const ddd = moment(dd, mask);
    if (isOver && isValid) onChange?.(ddd.toDate());
    return {
      ...returnedState,
      value: [day, month, year].join(maskDivider),
    };
  }, [onChange]);

  const handleBlur = useCallback((value: string, event: FocusEvent<HTMLInputElement>) => {
    handleChange(value);
    onBlur?.(event);
  }, [onBlur, handleChange]);

  const handleBeforeChangeState = useCallback((states: IBeforeChangeStates): TInputState => {
    console.log('handleBeforeChangeState => states', states);
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
      maskDivider={maskDivider}
      maskChar={maskChar}
      mask={getFormattedMask(initMask, maskDivider)}
      formats={formats}
      onFocus={(_, event) => onFocus?.(event)}
      onBlur={handleBlur}
      {...restProps}
    />
  );
};

export default memo(DateInput);
