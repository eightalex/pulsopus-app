import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export const ContainerStyled = styled(Stack)(({ theme: { spacing, breakpoints } }) => ({
	display: 'flex',
	flexGrow: 1,
	padding: spacing(8, 10, 2, 10),
	overflow: 'hidden',
	[breakpoints.down('xlg')]: {
		padding: spacing(8, 5, 2, 10),
	},
	[breakpoints.down('xlg')]: {
		padding: spacing(8, 4, 2, 8),
	},
}));