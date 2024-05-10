import { Breakpoint } from '@mui/system/createTheme/createBreakpoints';

declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		xs: true;
		sm: true;
		md: true;
		lg: true;
		xl: true;
		xlg: true;
		xxl: true;
	}
}

export type IBreakpoints = Record<Breakpoint, number>;

export const breakpoints = {
	xs: 0,
	sm: 600,
	md: 720,
	lg: 960,
	xlg: 1024,
	xl: 1200,
	xxl: 1400,
};

export const keys: Breakpoint[] = Object.keys(breakpoints).map(k => k.toString() as Breakpoint);
