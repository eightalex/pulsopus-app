import { Props as ReactInputMaskProps } from "react-input-mask";

export const MASK_CHAR = ' ';
export const MASK_DIVIDER = '.';
// export const MASK = ['DD', 'MM', 'YYYY'];
export const MASK = ['dD', 'mM', 'yYYY'];

export const MASK_CHARS_FORMAT: ReactInputMaskProps["formatChars"] = {
  d: '[0-3]',
  D: '[0-9]',
  m: '[0-1]',
  M: '[0-9]',
  y: '[1-2]',
  Y: '[0-9]',
};