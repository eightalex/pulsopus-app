import { ArrowLeftDoubleIcon, ArrowLeftIcon, ArrowRightIcon, ArrowRightDoubleIcon, TIcon } from '@/icons';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { FC } from 'react';

interface ICalendarNavIconProps extends SvgIconProps {
	icon: TIcon;
}

export const CalendarNavIcon: FC<ICalendarNavIconProps> = (props) => {
	const { icon: Icon, sx = {}, ...restProps } = props;
	return (
		<Icon
			color="success"
			sx={{ fontSize: 10, ...sx }}
			{...restProps}
		/>
	);
};

export const CalendarPrevIcon: FC<SvgIconProps> = (props) => <CalendarNavIcon icon={ArrowLeftIcon} {...props}/>;
export const CalendarPrev2Icon: FC<SvgIconProps> = (props) => <CalendarNavIcon icon={ArrowLeftDoubleIcon} {...props}/>;

export const CalendarNextIcon: FC<SvgIconProps> = (props) => <CalendarNavIcon icon={ArrowRightIcon} {...props}/>;
export const CalendarNext2Icon: FC<SvgIconProps> = (props) => <CalendarNavIcon icon={ArrowRightDoubleIcon} {...props}/>;
