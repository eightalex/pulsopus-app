import Stack from '@mui/material/Stack';
import { FC, useMemo } from 'react';

import { SideNavBarLink } from '@/components/SideNavBar/SideNavBarLink';
import { NAV_ICON_BY_PATH, NAV_LABELS_BY_PATH } from "@/constants/navBar.ts";
import { useWindowSize } from '@/hooks';

import { ISideNavBarListProps } from './types';

export const SideNavBarList: FC<ISideNavBarListProps> = ({ options = [] }) => {
	const { size: { width }, breakpointSizes } = useWindowSize();

	const isMinimize = useMemo(() => width <= breakpointSizes.xl, [width, breakpointSizes]);

	return (
		<Stack spacing={5} width={isMinimize ? '100%' : 'auto'}>
			{options.map((path) => (
				<SideNavBarLink
					key={path}
					to={path}
					label={NAV_LABELS_BY_PATH[path]}
					icon={NAV_ICON_BY_PATH[path]}
					isMinimize={isMinimize}
				/>
			))}
		</Stack>
	);
};
