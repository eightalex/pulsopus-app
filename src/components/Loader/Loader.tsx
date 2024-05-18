import { Stack } from '@mui/material';
import { FC, memo, useMemo } from 'react';
import { Triangle } from 'react-loader-spinner';

import { ILoader } from '@/components/Loader/types';
import { extendPalette } from '@/theme';

const Loader: FC<ILoader> = ({ fullSize = false, ...restProps }) => {

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
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				pointerEvents: 'none',
			}}
		>
			<Triangle
				visible={true}
				height="50"
				width="50"
				radius="9"
				color={extendPalette.loaderSurfaceDefault}
				ariaLabel="triangle-loading"
				wrapperStyle={{}}
				wrapperClass=""
				{...restProps}
			/>
		</Stack>
	);
};

export default memo(Loader);
