import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/system';

interface IContainerStyledProps {
	fullLine: boolean;
}

export const ContainerStyled = styled(({ ...props }: StackProps) =>
	<Stack
		{...props}
		direction="row"
		// spacing={3}
	/>, {
	shouldForwardProp: (prop) => prop !== 'fullLine',
	}
)<IContainerStyledProps>(({ theme: { spacing, breakpoints }, fullLine }) => ({
	position: 'relative',
	width: 'auto',
	minWidth: 36,
	height: 36,
	display: 'flex',
	flexGrow: 1,
	padding: fullLine ? spacing(1, 4) : spacing(1),
	overflow: 'auto',
	alignItems: 'center',
	border: '1px solid #CBCBCB',
	borderRadius: 4,
	cursor: 'pointer',
}));

// export const AppActionContainerStyled = styled(({ ...props }: StackProps) => <Stack {...props} spacing={1}
// 																																										direction="row"
// />)(({ theme: { breakpoints } }) => ({
// 	display: 'flex',
// 	flexDirection: 'row',
// 	justifyContent: 'space-between',
// 	alignItems: 'center',
// 	width: '100%',
// 	height: 'auto',
// 	maxWidth: '800px', // TODO: create constant in px or %
// 	[breakpoints.down('xl')]: {
// 		maxWidth: '100%',
// 	},
// 	[breakpoints.down('xl')]: {
// 		padding: spacing(8, 5, 8, 10),
// 	},
// 	[breakpoints.down('xl')]: {
// 		padding: spacing(8, 4, 8, 8),
// 	},
// }));
