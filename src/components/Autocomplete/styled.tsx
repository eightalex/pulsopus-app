import { styled } from '@mui/material/styles';

export const GroupHeaderStyled = styled('div')(({ theme: { extendPalette, palette: { typography } } }) => ({
	position: 'sticky',
	top: 0,
	padding: '2px 10px',
	textTransform: 'uppercase',
	color: typography.primary,
	fontSize: 16,
	fontFamily: 'IBM Plex Mono',
	fontWeight: 500,
	lineHeight: 1.2,
	backgroundColor: extendPalette.inputPaperSurfaceDefault,
	borderBottom: `1px dashed ${extendPalette.inputBorderSecondary}`,
}));

export const GroupItemsStyled = styled('ul')({
	padding: 0,
});
