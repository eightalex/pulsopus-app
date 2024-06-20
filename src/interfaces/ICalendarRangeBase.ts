import { ICalendarRange } from '@/components/CalendarRangePicker';

export interface ICalendarRangeBase {
	calendarRange: ICalendarRange;
	//
	setCalendarRange: (range: ICalendarRange) => void;
}
