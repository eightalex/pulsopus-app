import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { ElementType, memo, NamedExoticComponent, ReactNode } from 'react';

export interface ISvgIcon extends Omit<SvgIconProps, 'color' | 'component'> {
	color?:
		| 'primary'
		| 'secondary'
		| 'action'
		| 'info'
		| 'inherit'
		| 'critical'
		| 'accent'
		| 'accentLight'
		| 'success'
		| 'warning'
		| 'disabled';
	component?: ReactNode;
}

export const createSvgIcon = (IconComponent: ElementType, options: ISvgIcon = {}) => {
	const Component = (props: ISvgIcon) => <SvgIcon
		component={IconComponent}
		viewBox="0 0 32 32"
		{...options}
		{...props}
	/>;

	return memo(Component);
};

export type TIcon = NamedExoticComponent<ISvgIcon>;
