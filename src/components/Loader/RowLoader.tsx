import { FC, memo } from 'react';
import { LineWave } from 'react-loader-spinner';

import { BASE_COLOR, loaderSizes } from "@/components/Loader/constsants.ts";
import { LoaderWrapper } from "@/components/Loader/LoaderWrapper.tsx";
import { ILoader } from '@/components/Loader/types';

const RowLoader: FC<ILoader> = (props) => {
	const { size = 'medium', ...restProps } = props;
    return (
		<LoaderWrapper {...props}>
			<LineWave
				visible
				color={BASE_COLOR}
				ariaLabel="line-wave-loading"
				wrapperStyle={{}}
				wrapperClass=""
				firstLineColor=""
				middleLineColor=""
				lastLineColor=""
				{...loaderSizes[size]}
				{...restProps}
			/>
		</LoaderWrapper>
    );
};

export default memo(RowLoader);