import { Box, Stack } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { FC, memo } from 'react';

import { LineLoader } from '@/components/Loader';
import { extendPalette } from '@/theme';

interface LoadingButton extends ButtonProps {
	loading?: boolean;
}

const getLineLoaderColor = (color: ButtonProps["color"]): string => {
	switch (color) {
		case 'primary':
		case 'secondary':
			return extendPalette.loaderSurfaceSecondary;
		case 'info':
			return extendPalette.loaderSurfaceAlternative;
		case 'error':
			return extendPalette.loaderSurfaceError;
		default:
			return extendPalette.loaderSurfaceDefault;
	}
};

const LoadingButton: FC<LoadingButton> = ({ loading = false, children, disabled, color, ...restProps }) => {
	return (
		<Button
			color={color}
			{...restProps}
			disabled={loading || disabled}
		>
			<Stack position="relative">
				{loading && (
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
						}}
					>
						<LineLoader color={getLineLoaderColor(color)} />
					</Box>
				)}
				{children}
			</Stack>
		</Button>
	);
};

export default memo(LoadingButton);
