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

export interface IComputedDepartmentActivity {
	currentDepartmentActivity: number;
	prevDepartmentActivity: number;
	currentCompanyActivity: number;
	prevCompanyActivity: number;
	rate: number;
	trend: number;
	activities: IActivity[],
}

export interface IPeopleDynamicStore extends ICalendarRangeBase {
	view: EPeopleDynamicView;
	showAbsoluteData: boolean;
	department: IDepartment | null;
	//
	hexbinUsersData: IPeopleDynamicHexbinData;
	tableUsersData: IPeopleDynamicTableData[];
	departmentActivityData: IComputedDepartmentActivity;
	absoluteActivityData: IComputedDepartmentActivity;
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
