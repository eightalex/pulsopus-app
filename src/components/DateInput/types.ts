import { MomentInput } from "moment/moment";
import { ChangeEvent, FocusEvent, InputHTMLAttributes, ReactElement, ReactNode } from "react";
import { InputState, Props } from "react-input-mask";

export interface IReactInputProps extends Props {
}

export type TValue = MomentInput;

export interface IBeforeChangeStatesParams extends Pick<IReactInputProps, 'alwaysShowMask' | 'formatChars' | 'mask' | 'maskChar'> {
  permanents: number[];
}

export type TInputState = InputState;

export interface IBeforeChangeStates {
  nextState: TInputState;
  previousState: TInputState;
  value: string;
  params: IBeforeChangeStatesParams;
}

export interface IDateInputRenderProps extends Omit<IReactInputProps,
  'mask' | 'inputRef' | 'formatChars' | 'onChange' | 'beforeMaskedStateChange' | 'children' | 'onFocus' | 'onBlur' | 'value' | 'maskChar'> {
  value: string;
  active?: boolean;
  inputMask?: string | string[];
  valueMask?: string | string[];
  maskDivider?: string;
  charsFormat?: Record<string, (string | RegExp)>;
  maskChar?: string;
  onChange?(value: string, event: FocusEvent<HTMLInputElement>): void;
  onChange?(value: string, event: ChangeEvent<HTMLInputElement>): void;
  onChangeBefore?(states: IBeforeChangeStates): TInputState;
  onFocus?(value: string, event: FocusEvent<HTMLInputElement>): void;
  onBlur?(value: string, event: FocusEvent<HTMLInputElement>): void;
  onValidate?(value: string): boolean;
}

export interface IDateInputProps extends Partial<Omit<IDateInputRenderProps, 'onChange' | 'onChangeBefore' | 'onFocus' | 'onBlur' | 'onValidate' | 'value'>> {
  value: TValue;
  onChange?(date: number): void;
  onFocus?(event: FocusEvent<HTMLInputElement>): void;
  onBlur?(event: FocusEvent<HTMLInputElement>): void;
}

type TRIMChildrenProps = Partial<Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'>>;

declare module 'react-input-mask' {
  interface Props {
    formatChars: Record<string, (string | RegExp)>;
    children: ReactNode
      | ReactElement
      | ((props: TRIMChildrenProps) => ReactNode)
      | ((props: TRIMChildrenProps) => ReactElement);

    beforeMaskedValueChange?(
      nextState: TInputState,
      previousState: TInputState,
      inputValue: string,
      params: IBeforeChangeStatesParams
    ): TInputState;
  }
}