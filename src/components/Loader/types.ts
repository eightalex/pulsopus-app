import { ReactNode } from "react";
import { Props as LoaderProps } from 'react-loader-spinner';

export type TLoaderSize = 'small' | 'extraSmall' | 'medium';

export interface ILoaderWrapperProps {
	children: ReactNode;
	fullSize?: boolean;
}

export interface ILoader extends LoaderProps, Omit<ILoaderWrapperProps, 'children'> {
	size?: TLoaderSize,
}
