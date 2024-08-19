import { ReactNode, RefObject } from 'react';
import { EPeriodTypes } from './constants';

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
	onClose?: (e: MouseEvent) => void;
	children: ReactNode;
	targetRef?: RefObject<HTMLDivElement | undefined>;
}

export interface ICalendarRangePeriodItemProps {
	label: string;
	value: EPeriodTypes;
	isActive?: boolean;
	onClick?: (value: EPeriodTypes) => void;
}

export interface ICalendarRangePeriodListProps extends Pick<ICalendarRangePeriodItemProps, 'onClick'>{
	onChangePeriod?: (value: EPeriodTypes) => void;
	options?: Pick<ICalendarRangePeriodItemProps, 'label' | 'value'>[];
	checkIsActive?: (value: EPeriodTypes) => boolean;
}

export interface ICalendarRangePeriodsProps extends ICalendarRangePickerProps, Pick<ICalendarRangePeriodListProps, 'options'> {
}
