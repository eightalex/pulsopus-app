import { MomentInput } from "moment/moment";
import { ChangeEvent, FocusEvent, InputHTMLAttributes, ReactElement, ReactNode } from "react";
import { InputState, Props } from "react-input-mask";

export interface IReactInputProps extends Props {
}

export type TValue = MomentInput;

export interface IValueChangeParams {
  value: string;
  selection?: {
    start: number;
    end: number;
  }
}

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
  'mask' | 'inputRef' | 'formatChars' | 'onChange' | 'beforeMaskedStateChange' | 'children' | 'onFocus' | 'onBlur'> {
  active?: boolean;
  maskDivider?: string;
  mask: string | string[];
  formats?: Record<string, (string | RegExp)>;
  onChange?(value: string, event: FocusEvent<HTMLInputElement>): void;
  onChange?(value: string, event: ChangeEvent<HTMLInputElement>): void;
  onChangeBefore?(states: IBeforeChangeStates): TInputState;
  onFocus?(value: string, event: FocusEvent<HTMLInputElement>): void;
  onBlur?(value: string, event: FocusEvent<HTMLInputElement>): void;
}

export interface IDateInputProps extends Partial<Omit<IDateInputRenderProps, 'value' | 'onChange' | 'onChangeBefore' | 'onFocus' | 'onBlur'>> {
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