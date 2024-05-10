import { SideNavBarLink } from '@/components/SideNavBar/SideNavBarLink';
import { useWindowSize } from '@/hooks';
import Stack from '@mui/material/Stack';
import { FC, useMemo } from 'react';
import { ISideNavBarListProps } from './types';

export const SideNavBarList: FC<ISideNavBarListProps> = ({ options }) => {
	const { size: { width }, breakpointSizes } = useWindowSize();

	const isMinimize = useMemo(() => width <= breakpointSizes.xl, [width, breakpointSizes]);

	return (
		<Stack spacing={5} width={isMinimize ? '100%' : 'auto'}>
			{options?.map(({ path, label, icon }) => (
				<SideNavBarLink
					key={path}
					to={path}
					label={label}
					icon={icon}
					isMinimize={isMinimize}
				/>
			))}
		</Stack>
	);
};
