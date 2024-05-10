/* eslint-disable */
// @ts-expect-error
import Logo from '@/assets/icons/logo.svg?react';
import { createSvgIcon } from './utils/createSvgIcon';

export const LogoIcon = createSvgIcon(
	Logo,
	{
		viewBox: '0 0 226 32',
		sx: {
			width: 226,
			height: 32
		}
	}
);