import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

interface IRangeLabelContainer {
	fullLine: boolean;
}

export const RangeLabelContainerStyled = styled(
	(props: StackProps) => <Stack {...props} direction="row"/>,
	{
		shouldForwardProp: prop => prop !== 'fullLine',
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