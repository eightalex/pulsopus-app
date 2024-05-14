import Stack from '@mui/material/Stack';
import { FC, memo, ReactNode, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import Typography from '@/components/Typography';
import { TIcon } from '@/icons';

import { NavLinkStyled } from './styled';

interface IDefaultNavLinkProps {
	to: string;
	label: string;
	icon?: TIcon;
}

export interface INavLinkParams extends IDefaultNavLinkProps {
	isActive: boolean;
}

export type TTextVariant =
	'head1' |
	'head2' |
	'title' |
	'subtitle' |
	'body1' |
	'body2' |
	'text' |
	'caption1' |
	'caption2' |
	'caption3' |
	'overline';

export interface INavLinkProps extends IDefaultNavLinkProps {
	onClick?: () => void;
	isActive?: boolean;
	disabled?: boolean;
	children?: (params: INavLinkParams) => ReactNode;
	textVariant?: TTextVariant;
	textSize?: string | number;
}

export const variantSizes = {
	head1: 18,
	head2: 18,
	title: 18,
	subtitle: 18,
	body1: 18,
	body2: 18,
	text: 18,
	caption1: 18,
	caption2: 18,
	caption3: 18,
	overline: 18,
};

const NavLink: FC<INavLinkProps> = (props) => {
	const {
		to,
		isActive,
		icon: Icon,
		icon,
		label,
		children,
		textVariant = 'body1',
		textSize
	} = props;
	const location = useLocation();
	const active = useMemo(() => isActive || location.pathname.includes(to), [to, location, isActive]);

	return (
		<NavLinkStyled
			to={to}
			isActive={active}
		>
			{children ? children({ isActive: active, to, label, icon: props.icon }) : (
				<Stack
					spacing={3}
					direction="row"
					onClick={() => props.onClick?.()}
				>
					{Boolean(icon) && <Icon color="inherit"/>}
					<Typography
						variant={textVariant}
						fontSize={textSize || variantSizes[textVariant]}
						color="inherit"
					>
						{label.toUpperCase()}
					</Typography>
				</Stack>
			)}
		</NavLinkStyled>
	);
};

export default memo(NavLink);
