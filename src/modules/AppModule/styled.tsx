import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/system';

export const ContainerStyled = styled(Stack)(({ theme: { spacing, breakpoints } }) => ({
	display: 'flex',
	flexGrow: 1,
	padding: spacing(8, 10),
	overflow: 'auto',
	[breakpoints.down('xlg')]: {
		padding: spacing(8, 5, 8, 10),
	},
	[breakpoints.down('xlg')]: {
		padding: spacing(8, 4, 8, 8),
	},
}));

export const AppActionContainerStyled = styled(({ ...props }: StackProps) => <Stack
		{...props}
		spacing={1}
		direction='row'
	/>
)(({ theme: { breakpoints } }) => ({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
	height: 'auto',
	maxWidth: '800px', // TODO: create constant in px or %
	[breakpoints.down('xlg')]: {
		maxWidth: '100%',
	},
}));
