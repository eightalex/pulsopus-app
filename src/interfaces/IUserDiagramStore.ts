import { IAutocompleteOption } from '@/components/Autocomplete';
import { IActivity, ICalendarRangeBase, IDepartment, IUser } from '@/interfaces';

export interface IUserDiagramChartData {
	activity: IActivity[];
	trend: number;
	rate: number;
	currentRateValue: number;
	prevRateValue: number;
	title: string;
	subtitles: string[];
}

export interface IUserDiagramStore extends ICalendarRangeBase {
	targetId?: IUser["id"];
	user: IUser | null;
	isCompare: boolean;
	compareValue: IUser | IDepartment | null;
	compareOption: IAutocompleteOption<IUser | IDepartment> | null;
	//
	compareAutocompleteOptions: IAutocompleteOption<IUser | IDepartment>[];
	chartData: IUserDiagramChartData[];
	//
	isLoadingMount: boolean;
	isLoading: boolean;
	//
	onToggleCompare: () => void;
	setCompareValueByOption: (option?: IAutocompleteOption<IUser | IDepartment>) => void;
	setUser: (user: IUser | null) => void;
	mountStore: (userId?: IUser['id']) => void;
	unmountStore: () => void;
	setCompareValue: (compareValue: IUser | IDepartment | null) => void;
}
