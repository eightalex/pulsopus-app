import { DurationInputArg2 } from 'moment';
import { IAutocompleteOption } from '@/components/Autocomplete';
import { IChartDataPoint } from '@/components/Chart';
import { IGenerateActivityData } from '@/helpers/generateActivityData';
import { ICalendarRangeBase } from "@/interfaces/ICalendarRangeBase.ts";
import { IDepartment } from '@/interfaces/IDepartment';
import { IUser } from '@/interfaces/IUser';

export interface IUserDiagramStore extends ICalendarRangeBase {
	targetId?: IUser["id"];
	user: IUser | null;
	isCompare: boolean;
	compareValue: IUser | IDepartment | null;
	compareOption: IAutocompleteOption | null;
	compareAutocompleteOptions: IAutocompleteOption[];
	//
	chartData: IChartDataPoint[][];
	compareActivityData: IGenerateActivityData;
	userActivityData: IGenerateActivityData;
	//
	isLoadingMount: boolean;
	isLoading: boolean;
	//
	onToggleCompare: () => void;
	setCompareValueByOption: (option?: IAutocompleteOption) => void;
	setUser: (user: IUser | null) => void;
	mountStore: (userId?: IUser['id']) => void;
	unmountStore: () => void;
	getRangeDifference: () => { type: DurationInputArg2, diff: number };
	setCompareValue: (compareValue: IUser | IDepartment | null) => void;
}
