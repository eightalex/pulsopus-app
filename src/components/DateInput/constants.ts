import moment from "moment";
import { Props as ReactInputMaskProps } from "react-input-mask";

export const MASK_CHAR = ' ';

export const MASK_DIVIDER = '.';

// mask for value. Using moment presets for decode datetime value
export const MASK_FORMAT = ['DD', 'MM', 'YYYY'];

// mask for input. Using MASK_CHARS_FORMAT for decode input available value
export const MASK = ['TD', 'ID', 'MCDD'];

export const MASK_CHARS_FORMAT: ReactInputMaskProps["formatChars"] = {
  T: '[0-3]',
  I: '[0-1]',
  D: '[0-9]',
  M: '[1-2]',
  C: '[0,9]',
};

const YEAR_DELTA = 70;
export const MIN_YEAR = moment().year() - YEAR_DELTA;
export const MAX_YEAR = moment().year() + YEAR_DELTA;