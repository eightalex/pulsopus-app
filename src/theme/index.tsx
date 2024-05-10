import { theme } from '@/theme/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { FC, memo, ReactNode, useEffect, useMemo } from 'react';

export { extendPalette, typographyColors } from './extendPalette';

interface IThemeWrapperProps {
	children: ReactNode;
}

const ThemeWrapper: FC<IThemeWrapperProps> = ({ children }) => {
	// TODO: implement dark/light switch theme
	// const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const mulTheme = useMemo(() => theme, []);

	useEffect(() => {
		const themeColor = document.querySelector('meta[name="theme-color"]');
		if (themeColor) {
			themeColor.setAttribute('content', mulTheme.palette.background.default);
		}
	}, [mulTheme]);

	return (
		<ThemeProvider theme={mulTheme}>
			<CssBaseline enableColorScheme/>
			{children}
		</ThemeProvider>
	);
};

export default memo(ThemeWrapper);
