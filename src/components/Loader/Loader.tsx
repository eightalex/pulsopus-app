import { FC, memo } from 'react';
import { Triangle } from 'react-loader-spinner';

import { BASE_COLOR, loaderSizes } from "@/components/Loader/constsants.ts";
import { LoaderWrapper } from "@/components/Loader/LoaderWrapper.tsx";

import { ILoader } from './types.ts';

const Loader: FC<ILoader> = (props) => {
	const { size = 'medium', ...restProps } = props;
	return (
		<LoaderWrapper {...props}>
			<Triangle
				visible
				color={BASE_COLOR}
				ariaLabel="triangle-loading"
				wrapperStyle={{}}
				wrapperClass=""
				{...loaderSizes[size]}
				{...restProps}
			/>
		</LoaderWrapper>
	);
};

export default memo(Loader);
