import { IHexbinWidgetData } from "@/components/HexbinWidget";
import { EPeopleDynamicView } from '@/constants/EPeopleDynamic';
import { ICalendarRangeBase, IComputedDepartmentActivity, IDepartment, IUser } from "@/interfaces";

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
