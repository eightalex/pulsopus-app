import { ILoader } from '@/components/Loader/types';
import { extendPalette } from '@/theme';
import React, { FC, memo } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const LineLoader: FC<ILoader> = (props) => {
	return (
		<ThreeDots
			visible={true}
			height="30"
			width="40"
			radius="4"
			color={extendPalette.loaderSurfaceAlternative}
			ariaLabel="three-dots-loading"
			wrapperStyle={{}}
			wrapperClass=""
			{...props}
		/>
	);
};

export default memo(LineLoader);
