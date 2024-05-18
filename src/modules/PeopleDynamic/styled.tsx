import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/system';

export const PeopleDynamicViewWrapperStyled = styled(({ ...props }: StackProps) => <Stack
		{...props}
		spacing={1}
	/>
)(({ theme: { breakpoints } }) => ({
	display: 'flex',
	flexDirection: 'row',
	flex: 1,
	height: '100%',
	[breakpoints.down('xxl')]: {
		flexDirection: 'column',
	},
}));

export const PeopleDynamicViewContentStyled = styled(Stack)(({ theme: { breakpoints } }) => ({
	display: 'flex',
	flexGrow: 1,
	width: '100%',
	maxWidth: '800px', // TODO: create constant in px or %
}));

export const PeopleDynamicViewSideStyled = styled(({ ...props }: StackProps) => <Stack
		{...props}
		spacing={1}
		direction="column"
	/>
)(({ theme: { breakpoints, spacing } }) => ({
	position: 'relative',
	display: 'flex',
	flexGrow: 1,
	width: 'auto',
	paddingLeft: spacing(9),
	[breakpoints.down('xxl')]: {
		width: '100%',
		alignItems: 'flex-start',
		paddingTop: spacing(6),
		paddingLeft: 0,
	},
}));
