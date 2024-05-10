import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const IconWrapper = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
}));
