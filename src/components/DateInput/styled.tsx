import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

interface IDateInputStyledProps {
	active: boolean;
}

export const DateInputStyled = styled(TextField, {
	shouldForwardProp: (prop) => prop !== 'active',
})<IDateInputStyledProps>(({ theme: { extendPalette, spacing }, active }) => ({
	backgroundColor: 'transparent',
	width: 'auto',
	height: 'auto',

	'& .MuiOutlinedInput-root': {
		borderRadius: 4,
		padding: spacing(1, 2),
		fontSize: 12,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
		width: 'auto',
		height: 'auto',

		'& input': {
			textAlign: 'center',
		},

		'& .MuiOutlinedInput-notchedOutline': {
			border: `1px solid ${active ? extendPalette.inputBorderFocus : extendPalette.inputBorderSecondary}`,
		},

		'&:focus-within .MuiOutlinedInput-notchedOutline': {
			borderColor: extendPalette.inputBorderFocus,
		}
	}
}));
