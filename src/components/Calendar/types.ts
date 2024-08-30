import { CalendarProps } from "react-calendar";

export interface ICalendarRange {
	from?: number;
	to?: number;
}

type Range<T> = [T, T] | T[];

export type TValuePiece = number | string | Date | null;

export type TCalendarValue = TValuePiece | Range<TValuePiece>;

export type TCalendarReturnedValue = Range<number>;

export type TCalendarPropsOnChange = Exclude<CalendarProps['onChange'], undefined>;
export type TCalendarPropsOnChangeParameters = Parameters<TCalendarPropsOnChange>;
export type TCalendarPropsOnChangeValue = TCalendarPropsOnChangeParameters[0];

export interface ICalendarProps extends Omit<CalendarProps, 'value' | 'onChange'> {
	value: TCalendarValue;
	onChange?: (value: TCalendarReturnedValue) => void;
	onHoveredDays?: (days: Array<number | null>) => void;
}