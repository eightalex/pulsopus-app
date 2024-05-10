import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/system';

interface IRangeLabelContainer {
	fullLine: boolean;
}

interface IRangePeriodItem {
	active?: boolean;
}

export const RangeLabelContainerStyled = styled(({ ...props }: StackProps) =>
		<Stack{...props} direction="row"/>, {
		shouldForwardProp: (prop) => prop !== 'fullLine',
	}
)<IRangeLabelContainer>(({ theme: { spacing, extendPalette }, fullLine }) => ({
	position: 'relative',
	width: 'auto',
	minWidth: 36,
	height: 36,
	display: 'flex',
	flexGrow: 0,
	padding: fullLine ? spacing(1, 4) : spacing(1),
	overflow: 'auto',
	alignItems: 'center',
	border: `1px solid ${extendPalette.calendarSurfaceBorderDefault}`,
	borderRadius: 4,
	cursor: 'pointer',
}));

export const RangeDropdownStyled = styled(Paper)(({ theme: { extendPalette } }) => ({
	background: extendPalette.calendarSurfaceDefault,
}));

export const PeriodItemStyled = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'active',
})<IRangePeriodItem>(({ theme: { spacing, palette: { typography }, extendPalette }, active }) => ({
	position: 'relative',
	width: 'auto',
	padding: spacing(0, 6),
	color: typography.primary,
	cursor: 'pointer',
	backgroundColor: active ? extendPalette.calendarSurfacePrimaryPressed : 'transparent',
	transaction: 'all .2s ease',
	borderRadius: 0,
	border: '1px solid transparent',
	textTransform: 'uppercase',
	fontSize: 12,
	flexShrink: 0,

	'&:hover': {
		backgroundColor: extendPalette.calendarSurfacePrimaryHover,
	},

	'&:after': {
		content: '" "',
		position: 'absolute',
		top: '50%',
		right: -2,
		width: 1,
		height: 'calc(100% + 2px)',
		transform: 'translateY(-50%)',
		backgroundColor: active ? extendPalette.calendarSurfacePrimaryPressed : 'transparent',
	}
}));

