import { Props as ReactInputMaskProps } from "react-input-mask";

export const MASK_CHAR = ' ';

export const MASK_DIVIDER = '.';

// mask for value. Using moment presets for decode datetime value
export const MASK_FORMAT = ['DD', 'MM', 'YYYY'];

// mask for input. Using MASK_CHARS_FORMAT for decode input available value
export const MASK = ['TD', 'CD', 'MCDD'];

export const MASK_CHARS_FORMAT: ReactInputMaskProps["formatChars"] = {
  T: '[0-3]',
  D: '[0-9]',
  M: '[1-2]',
  C: '[0-1]',
};