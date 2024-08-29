import moment from 'moment';
import { MASK_DIVIDER, MAX_YEAR, MIN_YEAR } from "@/components/DateInput/constants.ts";
import { TValue } from "@/components/DateInput/types.ts";

export const getFormattedMask = (mask: string | string[], divider: string = MASK_DIVIDER): string => {
  return Array.isArray(mask)
    ? mask.join(divider)
    : mask;
};

export const isDateValid = (input: TValue): boolean => moment(input).isValid();

const getMinMaxValue = (min: number, max: number, value: number | string): number => {
  return Math.min(max, Math.max(min, Number(value)));
};

const isIncludeMinMaxValue = (min: number, max: number, value: number | string): boolean => {
  const v = Number(value);
  return v >= min && v <= max;
};

const paddingValue = (value: number | string): string => Number(value).toString().padStart(2, '0');

const getDefaultDateValues = (day: string, month: string, year: string): [number, number, number] => {
  const y = Boolean(year) && Number(year) && isIncludeMinMaxValue(MIN_YEAR, MAX_YEAR, year || 0)
    ? year
    : moment().year();
  const m = Boolean(month) && Number(month) && isIncludeMinMaxValue(1, 12, month || 0)
    ? month
    : getMinMaxValue(1, 12, Number(month || 0));
  const d = Boolean(day) && Number(day) && isIncludeMinMaxValue(1, 31, day || 0)
    ? day
    : getMinMaxValue(1, 31, Number(day || 0));
  return [d, m, y].map(n => Number(n)) as [number, number, number];
};

export const getValidationDay = (day: string, month: string, year: string): string => {
  const [d, m, y] = getDefaultDateValues(day, month, year);
  if (!y && !m) return paddingValue(d);
  if (m) {
    const maxInMonth = moment(`${m}-${y || 2024}`, 'MM-YYYY').daysInMonth();
    return paddingValue(getMinMaxValue(1, maxInMonth, d));
  }
  return paddingValue(d);
};

export const getValidationMonth = (day: string, month: string, year: string): string => {
  const [d, m, y] = getDefaultDateValues(day, month, year);
  if (!y && !d) return paddingValue(m);
  return paddingValue(m);
};

export const getValidationYear = (year: string, trimYear: string): string => {
  if(trimYear.length !== 4) return year;
  return getMinMaxValue(MIN_YEAR, MAX_YEAR, Number(year || 0)).toString();
};

