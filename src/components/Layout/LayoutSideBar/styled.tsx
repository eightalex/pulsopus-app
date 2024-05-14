import Stack from '@mui/material/Stack';
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