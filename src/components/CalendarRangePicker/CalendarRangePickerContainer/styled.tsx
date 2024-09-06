import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const CalendarRangePickerDropdownInner = styled(Paper)(({ theme: { extendPalette } }) => ({
	background: extendPalette.calendarSurfaceDefault,
}));