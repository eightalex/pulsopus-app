import { Stack } from '@mui/material';
import { FC, memo, useMemo } from 'react';
import { Triangle } from 'react-loader-spinner';

import { ILoader } from '@/components/Loader/types';
import { extendPalette } from '@/theme';

const sizes: Record<ILoader['size'], { width: number, height: number }> = {
	small: {
		height: 24,
		width: 24,
	},
	medium: {
		height: 50,
		width: 50,
	},
};

const Loader: FC<ILoader> = ({ fullSize = false, size = 'medium', ...restProps }) => {

	const wrapperStyled = useMemo(() => {
		if (fullSize) {
			return {
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				width: '100%',
				height: '100%',
			};
		}

		return {
			width: 'auto',
			height: 'auto',
		};
	}, [fullSize]);
	return (
		<Stack
			sx={{
				...wrapperStyled,
				alignItems: 'center',
				justifyContent: 'center',
				pointerEvents: 'none',
			}}
		>
			<Triangle
				visible
				height="50"
				width="50"
				color={extendPalette.loaderSurfaceDefault}
				ariaLabel="triangle-loading"
				wrapperStyle={{}}
				wrapperClass=""
				{...sizes[size]}
				{...restProps}
			/>
		</Stack>
	);
};

export default memo(Loader);
