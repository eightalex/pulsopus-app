import { LineLoader } from '@/components/Loader';
import { extendPalette } from '@/theme';
import { Box, Stack } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import React, { FC, memo } from 'react';

interface LoadingButton extends ButtonProps {
	loading?: boolean;
}

const LoadingButton: FC<LoadingButton> = ({ loading = false, children, disabled, ...restProps }) => {
	return (
		<Button
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
						<LineLoader color={extendPalette.loaderSurfaceSecondary} />
					</Box>
				)}
				{children}
			</Stack>
		</Button>
	);
};

export default memo(LoadingButton);
