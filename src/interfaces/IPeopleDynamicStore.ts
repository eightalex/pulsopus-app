import { ICalendarRange } from '@/components/CalendarRangePicker';
import { EPeopleDynamicView } from '@/constants/EPeopleDynamic';
import { IGenerateActivityData } from '@/helpers/generateActivityData';
import { IActivity } from "@/interfaces/IActivity.ts";
import { IDepartment } from '@/interfaces/IDepartment';
import { IUser } from '@/interfaces/IUser';

export interface IPeopleDynamicStore {
	view: EPeopleDynamicView;
	calendarRange: ICalendarRange;
	showAbsoluteData: boolean;
	department: IDepartment | null;
	//
	usersForRender: IUser[];
	absoluteDtaActivities: IActivity[];
	departmentActivityData: IGenerateActivityData;
	absoluteActivityData: IGenerateActivityData;
	//
	isLoading: boolean;
	//
	onToggleView: (view?: EPeopleDynamicView) => void;
	onToggleShowAbsoluteData: () => void;
	setCalendarRange: (range: ICalendarRange) => void;
	setDepartment: (department: IDepartment | null) => void;
	//
	mountStore: () => void;
	unmountStore: () => void;
}
