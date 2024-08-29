import "react-datepicker/dist/react-datepicker.css";

import Stack from '@mui/material/Stack';
import moment from 'moment';
import { ChangeEvent, FC, FocusEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import ReactInputMask, { Props as ReactInputMaskProps } from "react-input-mask";

import { getFormattedMask } from "@/components/DateInput/helpers.ts";

import { MASK, MASK_CHAR, MASK_CHARS_FORMAT, MASK_DIVIDER, MASK_FORMAT } from "./constants.ts";
import { DateInputStyled } from './styled';
import { IBeforeChangeStatesParams, IDateInputRenderProps, TInputState } from './types';

export const DateInputRender: FC<IDateInputRenderProps> = (props) => {
  const {
    maskDivider = MASK_DIVIDER,
    maskChar = MASK_CHAR,
    inputMask = MASK,
    valueMask = MASK_FORMAT,
    charsFormat = {},
    value,
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

  const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    const targetValue = event.target.value || '';
    const caretPosEnd = targetValue.length || 1;
    event.target?.setSelectionRange(caretPosEnd, caretPosEnd);
    onFocus?.(targetValue, event);
  }, [onFocus]);

  const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
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
