import { IHexbinWidgetData } from "@/components/HexbinWidget";
import { EPeopleDynamicView } from '@/constants/EPeopleDynamic';
import { IActivity } from "@/interfaces/IActivity.ts";
import { ICalendarRangeBase } from "@/interfaces/ICalendarRangeBase.ts";
import { IDepartment } from '@/interfaces/IDepartment';
import { IUser } from '@/interfaces/IUser';

export interface IPeopleDynamicHexbinData extends Array<IHexbinWidgetData<IUser>> {}

export interface IPeopleDynamicTableData {
	rate: number;
	trend: number;
	fill: string;
	user: IUser;
}

export interface IPeopleDynamicStore extends ICalendarRangeBase {
	view: EPeopleDynamicView;
	showAbsoluteData: boolean;
	department: IDepartment | null;
	//
	hexbinUsersData: IPeopleDynamicHexbinData;
	tableUsersData: IPeopleDynamicTableData[];
	//TODO: create return interface
	departmentActivityData: { rate: number, trend: number };
	//TODO: create return interface
	absoluteActivityData: { rate: number, trend: number, activities: IActivity[] };
	//
	absoluteDtaActivities: IActivity[];
	//
	isLoading: boolean;
	isLoadingMounting: boolean;
	//
	onToggleView: (view?: EPeopleDynamicView) => void;
	onToggleShowAbsoluteData: () => void;
	setDepartment: (department: IDepartment | null) => void;
	//
	mountStore: () => void;
	unmountStore: () => void;
}
