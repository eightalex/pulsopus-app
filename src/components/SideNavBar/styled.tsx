import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { SIDE_BAR_WIDTH_MAX, SIDE_BAR_WIDTH_MIN } from '@/constants/size';

interface ISideNavBarStyledProps {
	isMinimize: boolean;
}

interface SideNavBarLinkStyledProp {
	isActive: boolean;
	isMinimize: boolean;
	isDefaultActive: boolean;
}

export const SideNavBarStyled = styled(({ ...props }: StackProps) =>
	<Stack
		{...props}
		spacing={1}
		justifyContent="space-between"
	/>, {
	shouldForwardProp: (prop) => prop !== 'isMinimize',
})<ISideNavBarStyledProps>(({ theme: { extendPalette: { backgroundColorSecondary, borderColorHide }, spacing }, isMinimize }) => ({
	backgroundColor: backgroundColorSecondary,
	borderRight: `1px solid ${borderColorHide}`,
	maxWidth: isMinimize ? SIDE_BAR_WIDTH_MIN : SIDE_BAR_WIDTH_MAX,
	width: isMinimize ? SIDE_BAR_WIDTH_MIN : SIDE_BAR_WIDTH_MAX,
	minWidth: SIDE_BAR_WIDTH_MIN,
	height: '100%',
	padding: spacing(9, 0),
	display: 'flex',
	alignItems: 'center',
	transition: 'width .3s ease'
}));

export const SideNavBarLinkStyled = styled(Stack, { shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'isMinimize' && prop !== 'isDefaultActive' })<SideNavBarLinkStyledProp>(({ theme: { extendPalette }, isDefaultActive, isActive, isMinimize }) => ({
	justifyContent: isMinimize ? 'center' : 'flex-start',
	width: '100%',
	display: 'flex',
	flexGrow: 1,
	position: 'relative',
	'&::before': {
		position: 'absolute',
		top: 0,
		left: 0,
		content: '""',
		display: 'block',
		height: '100%',
		width: 4,
		borderBottomRightRadius: 8,
		borderTopRightRadius: 8,
		backgroundColor: isDefaultActive || !(isActive && isMinimize)
			? 'transparent'
			: extendPalette.navLinkColorActive,
	}
}));

// export const SideOptionsStyled = styled(Stack)({
// 	display: 'flex',
// 	flexGrow: 1,
// });
//
// export const SideNavBarStyled = styled(Stack)({
// 	width: 'auto',
// 	background: 'black', // TODO: add background theme palette color variable
// 	borderRight: `1px solid #58585833`, // TODO: add background theme palette color variable
// 	maxWidth: SIDE_BAR_WIDTH_MAX,
// 	display: 'flex',
// 	height: '100%',
// });

// interface IStyledS {
// 	type: string;
// }

// export const StyledS = styled('div', {
// 	shouldForwardProp: (prop) => prop !== 'type',
// })<IStyledS>(({ theme: { extendPalette }, type }) => ({
// 	backgroundColor: '#eee',
// 	display: 'flex',
// 	justifyContent: 'center',
// 	alignItems: 'center',
// 	aspectRatio: '1 / 1',
// 	userSelect: 'none',
// 	boxSizing: 'border-box',
// 	cursor: 'pointer',
// 	...getKeyButtonStyledByType(type, extendPalette),
// }));

//
// export const SideWrapper = styled(Stack)(({ theme }) => ({
// 	width: 96,
// 	minWidth: 96,
// 	height: 96,
// 	minHeight: 96,
// 	alignItems: 'center',
// 	justifyContent: 'space-between',
// 	padding: theme.spacing(0.5, 0),
// 	background: theme.extendPalette.background??,
// 	borderRadius: 8,
// 	boxSizing: 'border-box',
// }));
