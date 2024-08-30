import { CalendarProps } from "react-calendar";

export interface ICalendarRange {
	from?: number;
	to?: number;
}

type Range<T> = [T, T] | T[];

export type TValuePiece = number | string | Date | null;

export type TCalendarValue = TValuePiece | Range<TValuePiece>;

export type TReturnedValue = number | Range<number>;

export interface ICalendarProps extends Omit<CalendarProps, 'value'> {
	value: TCalendarValue;
	onChange?: (value: TCalendarValue) => void;
	onHoveredDays?: (days: Array<Date | null>) => void;
}