import { CalendarProps } from 'react-calendar';

export interface ICalendarRange {
	from?: number;
	to?: number;
}

type ValuePiece = Date | null;

export type TCalendarValue = ValuePiece | [ValuePiece, ValuePiece];

export interface ICalendarProps extends Omit<CalendarProps, 'value'> {
	onChange?: (value: TCalendarValue) => void;
	onHoveredDays?: (days: Array<Date | null>) => void;
}
