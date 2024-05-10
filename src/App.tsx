import { IS_DEV } from '@/config';
import { DOCUMENTS_TITLES } from '@/constants/routes';
import { routes } from '@/routes';
import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { AppDevInfo } from "@/AppDevInfo.tsx";

const App = observer(() => {
	const location = useLocation();
	const element = useRoutes(routes);

	useEffect(() => {
		document.title = DOCUMENTS_TITLES[location.pathname] || DOCUMENTS_TITLES.ROOT_ROUTE;
	}, [location.pathname]);

	return (
		<Box
			sx={({ palette: { backgroundColorPrimary, typography } }) => ({
				position: 'relative',
				width: '100vw',
				height: '100vh',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: backgroundColorPrimary,
				color: typography.primary,
			})}
		>
			{IS_DEV && <AppDevInfo/>}
			{element}
		</Box>
	);
});

export default App;
