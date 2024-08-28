import moment from 'moment';
import { MASK_DIVIDER } from "@/components/DateInput/constants.ts";
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

const paddingValue = (value: number | string): string => value.toString().padStart(2, '0');

const validateIsNumber = (v: number | string | undefined | null) =>  !`${v}` || !Number.isNaN(Number(v));

const validatePadValue = (v: string, length= 2): boolean => !Number.isNaN(Number(v)) && v.toString().length > length - 1;

export const getValidationDay = (d, m, y): string => {
	if(!validateIsNumber(d)) return d;
	if(d.toString().length === 1) {
		return getMinMaxValue(0, 3, d).toString();
	}
	const maxDays = m ?
		moment()
			.set({ day: 1, month: m, year: y || moment().get('year') })
			.daysInMonth()
		: 31;
	return paddingValue(getMinMaxValue(1, 31, d));
};

export const getValidationMonth = (d, m, y): string => {
	if(!m || !validateIsNumber(m)) return m;
	const v =  m.toString().length === 1
		? getMinMaxValue(0, 1, m).toString()
		: paddingValue(getMinMaxValue(1, 12, m));
	return v;
};

export const getValidationYear = (d, m, y): string => {
	if (!validatePadValue(y, 4)) return y;
	return paddingValue(getMinMaxValue(2000, moment().get('year'), y));
};

