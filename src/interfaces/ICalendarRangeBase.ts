import { unitOfTime } from "moment/moment";
import { ICalendarRange } from '@/components/CalendarRangePicker';

export interface ICalendarRangeBase {
	calendarRange: ICalendarRange;
	//
	getCalendarRangeDiff: (unitTimeDiff?: unitOfTime.Diff) => number;
	setCalendarRange: (range: ICalendarRange) => void;
}
