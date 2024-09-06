import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

interface IRangePeriodItem {
  active?: boolean;
}

export const CalendarRangePeriodsStyled = styled(Stack)(({ theme: { spacing } }) => ({
  width: 'auto',
  height: 'auto',
  flexGrow: 1,
  padding: spacing(3, 0),
  boxSizing: 'border-box',
}));

export const CalendarRangePeriodItemWrapperStyled = styled(Stack)(({ theme: { spacing } }) => ({
  padding: spacing(1, 0),
  cursor: 'pointer',
}));

export const CalendarRangePeriodItemStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<IRangePeriodItem>(({ theme: { spacing, palette: { typography }, extendPalette }, active }) => ({
  position: 'relative',
  width: 'auto',
  padding: spacing(0, 6),
  color: typography.primary,
  cursor: 'pointer',
  backgroundColor: active ? extendPalette.calendarSurfacePrimaryPressed : 'transparent',
  transaction: 'all .2s ease',
  borderRadius: 0,
  border: '1px solid transparent',
  textTransform: 'uppercase',
  fontSize: 12,
  flexShrink: 0,

  '&:hover': {
    backgroundColor: extendPalette.calendarSurfacePrimaryHover,
  },

  '&:after': {
    content: '" "',
    position: 'absolute',
    top: '50%',
    right: -2,
    width: 1,
    height: 'calc(100% + 2px)',
    transform: 'translateY(-50%)',
    backgroundColor: active ? extendPalette.calendarSurfacePrimaryPressed : 'transparent',
  }
}));

