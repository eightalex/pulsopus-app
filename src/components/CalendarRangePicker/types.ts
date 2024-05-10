import { EPeriodTypes } from './constants';
import { ReactNode, RefObject } from 'react';

export interface ICalendarRange {
	from?: number;
	to?: number;
}

export interface ICalendarRangePickerProps {
	onChange?: (range: ICalendarRange) => void;
	range: ICalendarRange;
}

export interface ICalendarRangePickerLabelProps extends ICalendarRange {
	onClick?: () => void;
}

export interface ICalendarRangePickerViewProps extends ICalendarRange {
	onClose?: () => void;
	onSetRange?: (range: ICalendarRange) => void;
	onSetPeriod?: (period: EPeriodTypes) => void;
	period: EPeriodTypes;
}

export interface ICalendarRangePickerDropdownProps {
	onClose?: () => void;
	children: ReactNode;
	targetRef?: RefObject<HTMLDivElement | undefined>;
}
