import { breakpoints, IBreakpoints } from '@/constants/breakpoints';
import { Breakpoint } from '@mui/system/createTheme/createBreakpoints';
import { useMemo, useState } from 'react';
import { useEventListener } from './useEventListener';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface IWindowSize {
	width: number;
	height: number;
}

interface IScreenBreakpoints extends Record<Breakpoint, boolean> {
}

export function useWindowSize(): { size: IWindowSize, breakpoints: IScreenBreakpoints, breakpointSizes: IBreakpoints } {
	const [windowSize, setWindowSize] = useState<IWindowSize>({
		width: 0,
		height: 0,
	});

	const breakpointStatus = useMemo(() => {
		const { width } = windowSize;
		return Object.entries(breakpoints).reduce((acc, breakpoint, idx, arr) => {
			const [k, v] = breakpoint as [Breakpoint, number];
			const upV = arr[idx + 1]?.[1] || 9999;
			acc[k] = width >= v && width < upV;
			return acc;
		}, {} as IScreenBreakpoints);
	}, [windowSize]);

	const handleSize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useEventListener('resize', handleSize);

	useIsomorphicLayoutEffect(() => {
		handleSize();
	}, []);

	return {
		size: windowSize,
		breakpoints: breakpointStatus,
		breakpointSizes: breakpoints,
	};
}
