import { unitOfTime } from "moment/moment";
import { ICalendarRange } from '@/components/CalendarRangePicker';

export interface ICalendarRangeBase {
	calendarRange: ICalendarRange;
	rangeFrom: number;
	rangeTo: number;
	//
	getCalendarRangeDiff: (unitTimeDiff?: unitOfTime.Diff) => number;
	setCalendarRange(range: ICalendarRange): void;
	setCalendarRange(range: ICalendarRange, minDiffInDays: number): void;
}
