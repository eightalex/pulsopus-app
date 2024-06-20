import { IHexbinWidgetData } from "@/components/HexbinWidget";
import { EPeopleDynamicView } from '@/constants/EPeopleDynamic';
import { IGenerateActivityData } from '@/helpers/generateActivityData';
import { IActivity } from "@/interfaces/IActivity.ts";
import { ICalendarRangeBase } from "@/interfaces/ICalendarRangeBase.ts";
import { IDepartment } from '@/interfaces/IDepartment';
import { IUser } from '@/interfaces/IUser';

export interface IPeopleDynamicHexbinData extends Array<IHexbinWidgetData<IUser>> {}

export interface IPeopleDynamicTableData extends IPeopleDynamicHexbinData {
	trend: number;
}

export interface IPeopleDynamicStore extends ICalendarRangeBase {
	view: EPeopleDynamicView;
	showAbsoluteData: boolean;
	department: IDepartment | null;
	//
	hexbinUsersData: IPeopleDynamicHexbinData
	absoluteDtaActivities: IActivity[];
	departmentActivityData: IGenerateActivityData;
	absoluteActivityData: IGenerateActivityData;
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
