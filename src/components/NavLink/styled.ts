import { NavLink } from 'react-router-dom';
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from '@mui/system';

interface INavLinkStyledProps {
	isActive: boolean;
}

export const NavLinkStyled = styled(NavLink, {
	shouldForwardProp: (prop) => prop !== 'isActive',
})<INavLinkStyledProps>(({ theme: { extendPalette }, isActive }) => ({
	cursor: 'pointer',
	transaction: 'color .2s ease',
	textDecoration: 'none',
	color: isActive ? extendPalette.navLinkColorActive: extendPalette.navLinkColorDefault,
	'&:hover': {
		color: extendPalette.navLinkColorHover,
	},
	'&:active': {
		color: extendPalette.navLinkColorPressed,
	},
	'& > *': {
		color: 'inherit',
	}
}));