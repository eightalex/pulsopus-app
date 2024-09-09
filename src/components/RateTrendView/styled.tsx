import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export const RateTrendViewStyled = styled(Stack)(({ theme: { extendPalette, spacing } }) => ({
    padding: spacing(2, 4),
    backgroundColor: extendPalette.paperBackgroundDefault,
    border: `1px solid ${extendPalette.paperBorderColorDefault}`,
    borderRadius: 6,
}));