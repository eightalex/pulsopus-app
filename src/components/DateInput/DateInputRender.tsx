import "react-datepicker/dist/react-datepicker.css";

import Stack from '@mui/material/Stack';
import moment from 'moment';
import { ChangeEvent, FC, FocusEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import ReactInputMask, { Props as ReactInputMaskProps } from "react-input-mask";

import { getFormattedMask } from "@/components/DateInput/helpers.ts";

import { MASK, MASK_CHAR, MASK_CHARS_FORMAT, MASK_DIVIDER, MASK_FORMAT } from "./constants.ts";
import { DateInputStyled } from './styled';
import { IBeforeChangeStatesParams, IDateInputRenderProps, TInputState, TValue } from './types';

export const DateInputRender: FC<IDateInputRenderProps> = (props) => {
  const {
    maskDivider = MASK_DIVIDER,
    maskChar = MASK_CHAR,
    inputMask = MASK,
    valueMask = MASK_FORMAT,
    charsFormat = {},
    value: initValue = moment().valueOf(),
    onChange,
    onChangeBefore,
    onFocus,
    onBlur,
    active = false,
    ...restProps
  } = props;
  const inputRef = useRef<HTMLInputElement>();

  const formatChars = useMemo(() => ({
    ...MASK_CHARS_FORMAT,
    ...charsFormat,
  }), [charsFormat]);

  const format = useMemo(() => getFormattedMask(valueMask, maskDivider), [valueMask, maskDivider]);

  const value = useMemo((): string => {
    const defaultValue = moment().format(format);
    if(!initValue) return defaultValue;
    const d = moment(initValue as TValue);
    if(!d.isValid() || !moment(d.format(format)).isValid()) return defaultValue;
    return d.format(format);
  }, [initValue, format]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    onChange?.(v, event);
  }, [onChange]);

  const handleChangeBefore = useCallback(
    (
      nextState: TInputState,
      previousState: TInputState,
      inputValue: string,
      params: IBeforeChangeStatesParams
    ): TInputState => {
      if (!onChangeBefore) return nextState;
      const result = onChangeBefore?.({
        nextState,
        previousState,
        value: inputValue,
        params,
      });

      return {
        value: result?.value || nextState.value,
        selection: {
          start: result?.selection?.start || nextState.selection?.start || 0,
          end: result?.selection?.end || nextState.selection?.end || 0,
        }
      };
    }, [onChangeBefore]);

  // const beforeMaskedValueChange = useCallback((newState: IValueChangeParams, prevState: IValueChangeParams, userInput: string): IValueChangeParams => {
  //   const returnedState = {
  //     value: newState.value,
  //     selection: newState.selection,
  //   };
  //   if (newState.value === prevState.value || !userInput) return returnedState;
  //   const vs = newState.value.split('.').map(n => !Number.isNaN(Number(n)) ? n : null);
  //   const [d, m, y] = vs;
  //   const day = getValidationDay(d, m, y);
  //   const month = getValidationMonth(d, m, y);
  //   const year = getValidationYear(d, m, y);
  //   // const dd = [day, month, year].join(divider);
  //   const dd = handleJoinMask([day, month, year]);
  //   const isValid = moment(handleJoinMask([day, month, year]), format, true).isValid();
  //
  //   const isOver = dd.length === format.length;
  //
  //   if (isOver && !isValid) return prevState;
  //   const ddd = moment(dd, format);
  //   if (isOver && isValid) onChange?.(ddd.toDate());
  //   return {
  //     ...returnedState,
  //     // value: [day, month, year].join(divider),
  //     value: handleJoinMask([day, month, year]),
  //   };
  // }, [onChange, handleJoinMask]);

  const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    const targetValue = event.target.value || '';
    const caretPosEnd = targetValue.length || 1;
    event.target?.setSelectionRange(caretPosEnd, caretPosEnd);
    onFocus?.(targetValue, event);
  }, [onFocus]);

  const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
    const targetValue = event.target.value || '';
    const d = moment(targetValue, format, true);
    if(d.isValid()) onChange?.(targetValue, event);
    event.target.blur();
    onBlur?.(targetValue, event);
  }, [format, onChange, onBlur]);

  useEffect(() => {
    if (active) {
      inputRef?.current?.focus();
    } else {
      inputRef?.current?.blur();
    }
  }, [inputRef, active]);

  return (
    <ReactInputMask
      value={value}
      mask={getFormattedMask(inputMask, maskDivider)}
      maskChar={maskChar}
      alwaysShowMask={false}
      formatChars={formatChars}
      {...restProps}
      onChange={handleChange}
      // cast for ignore ts lint error. Correct type in './types.ts' declare module.
      beforeMaskedValueChange={handleChangeBefore as unknown as ReactInputMaskProps['beforeMaskedValueChange']}
    >
      {(inputProps) => (
        <Stack direction="row" spacing={0}>
          <DateInputStyled
            type="tel"
            inputRef={inputRef}
            {...inputProps}
            active={active}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Stack>
      )}
    </ReactInputMask>
  );
};
