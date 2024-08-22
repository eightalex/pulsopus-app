import "react-datepicker/dist/react-datepicker.css";

import Stack from '@mui/material/Stack';
import moment from 'moment';
import { ChangeEvent, FC, FocusEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import ReactInputMask, { Props as ReactInputMaskProps } from "react-input-mask";

import { getFormattedMask } from "@/components/DateInput/helpers.ts";

import { MASK, MASK_CHAR, MASK_CHARS_FORMAT, MASK_DIVIDER } from "./constants.ts";
import { DateInputStyled } from './styled';
import { IBeforeChangeStatesParams, IDateInputRenderProps, TInputState, TValue } from './types';

export const DateInputRender: FC<IDateInputRenderProps> = (props) => {
  const {
    maskDivider = MASK_DIVIDER,
    maskChar = MASK_CHAR,
    mask: initMask = MASK,
    formats = {},
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
    ...formats,
  }), [formats]);

  const mask = useMemo(
    () => getFormattedMask(initMask, maskDivider)
    , [initMask, maskDivider]);

  const value = useMemo((): string => {
    const defaultValue = moment().format(mask);
    if(!initValue) return defaultValue;
    const d = moment(initValue as TValue);
    if(!d.isValid() || !moment(d.format(mask)).isValid()) return defaultValue;
    return d.format(mask);
  }, [initValue, mask]);

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
      return onChangeBefore?.({
        nextState,
        previousState,
        value: inputValue,
        params,
      });
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
  //   const isValid = moment(handleJoinMask([day, month, year]), mask, true).isValid();
  //
  //   const isOver = dd.length === mask.length;
  //
  //   if (isOver && !isValid) return prevState;
  //   const ddd = moment(dd, mask);
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
    const d = moment(targetValue, mask, true);
    if(d.isValid()) onChange?.(targetValue, event);
    event.target.blur();
    onBlur?.(targetValue, event);
  }, [onChange, onBlur, mask]);

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
      mask={mask}
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

  // return (
  //   <DatePicker
  //     // selected={startDate}
  //     // onChange={(date) => setStartDate(date)}
  //     dateFormat="dd.MM.yyyy"
  //     dateFormatCalendar="dd.MM.yyyy"
  //     showDateSelect={false}
  //     showPreviousMonths={false}
  //     showMonthYearPicker={false}
  //     showFullMonthYearPicker={false}
  //     showTwoColumnMonthYearPicker={false}
  //     showFourColumnMonthYearPicker={false}
  //     customInput={
  //       <DateInputMastStyled
  //         mask={mask}
  //         value={currentState}
  //         maskChar={' '}
  //         // onChange={handleChange}
  //         alwaysShowMask={false}
  //         formatChars={formatChars}
  //         beforeMaskedValueChange={beforeMaskedValueChange}
  //       >
  //         {(params) => (
  //           <Stack direction="row" spacing={0} >
  //             <DateInputStyled
  //               // type="date"
  //               type="tel"
  //               inputRef={inputRef}
  //               {...params}
  //               active={active}
  //               onFocus={handleFocus}
  //               onBlur={handleBlur}
  //             />
  //           </Stack>
  //         )}
  //       </DateInputMastStyled>
  //     }
  //   />
  // );

  // return (
  //   <DateInputMaskStyled
  //     mask={mask}
  //     value={currentState}
  //     maskChar={' '}
  //     onChange={handleChange}
  //     alwaysShowMask={false}
  //     formatChars={formatChars}
  //     beforeMaskedValueChange={beforeMaskedValueChange}
  //   >
  //     {(params) => (
  //       <Stack
  //         direction="row"
  //         spacing={0}
  //       >
  //         <DateInputStyled
  //           type="tel"
  //           inputRef={inputRef}
  //           {...params}
  //           active={active}
  //           onFocus={handleFocus}
  //           onBlur={handleBlur}
  //           // inputProps={{ min: "2019-01-24", max: "2020-05-31" }}
  //         >
  //           <Typography>params</Typography>
  //         </DateInputStyled>
  //       </Stack>
  //     )}
  //   </DateInputMaskStyled>
  // );
};
