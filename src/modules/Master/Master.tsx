import { memo } from 'react';
import { useRoutes } from 'react-router-dom';
import Box from '@mui/material/Box';
import { routes } from '@/routes';

export const Master = memo(() => {
	const element = useRoutes(routes);

	return (
		<Box
			component="main"
			sx={{
				display: 'flex',
				flex: '1',
				overflow: 'hidden',
				flexDirection: 'column',
			}}
		>
			{element}
		</Box>
	);
});
