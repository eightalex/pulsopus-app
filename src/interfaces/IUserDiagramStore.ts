import { IAutocompleteOption } from '@/components/Autocomplete';
import { ICalendarRange } from '@/components/CalendarRangePicker';
import { IChartDataPoint } from '@/components/Chart';
import { IGenerateActivityData } from '@/helpers/generateActivityData';
import { IDepartment } from '@/interfaces/IDepartment';
import { IUser } from '@/interfaces/IUser';
import { DurationInputArg2 } from 'moment';

export interface IUserDiagramStore {
	user: IUser | null;
	calendarRange: ICalendarRange;
	isCompare: boolean;
	compareValue: IUser | IDepartment | null;
	compareOption: IAutocompleteOption | null;
	compareOptions: IAutocompleteOption[];
	//
	chartData: IChartDataPoint[][];
	compareActivityData: IGenerateActivityData;
	userActivityData: IGenerateActivityData;
	//
	isLoadingMount: boolean;
	isLoading: boolean;
	//
	onToggleCompare: () => void;
	setCompareValueByIdx: (idx: IAutocompleteOption['idx'] | null) => void;
	setCalendarRange: (range: ICalendarRange) => void;
	setUser: (user: IUser | null) => void;
	mountStore: (userId?: IUser['id']) => void;
	unmountStore: () => void;
	getRangeDifference: () => { type: DurationInputArg2, diff: number };
}
