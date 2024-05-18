import Stack from '@mui/material/Stack';
import { observer } from "mobx-react";
import { FC, useCallback, useMemo } from 'react';

import { SideNavBarLink } from "@/components/SideNavBar/SideNavBarLink.tsx";
import { getSidebarNavLinksByRoles } from "@/helpers/getSidebarNavLinksByRoles.ts";
import { useStores,useWindowSize } from '@/hooks';
import { ExitOutlinedIcon, LogoIcon } from '@/icons';

import { SideNavBarList } from './SideNavBarList';
import { SideNavBarStyled } from './styled';
import { ISideNavBarProps } from './types';

export const SideNavBar: FC<ISideNavBarProps> = observer((props) => {
	const {
		hideLogo = false,
		hideExit = false,
	} = props;
	const { size: { width }, breakpointSizes } = useWindowSize();
	const { rootStore: { authStore: { onLogout, user } } } = useStores();
	const userRoles = user?.roles || [];

	const isMinimize = useMemo(() => width <= breakpointSizes.xl, [width, breakpointSizes]);

	const logoSxParams = useMemo(() => ({
		width: isMinimize ? 134 : 134,
		height: isMinimize ? 15 : 18,
	}), [isMinimize]);

	const options = getSidebarNavLinksByRoles(userRoles || []);

	const handleLogout = useCallback(() => {
		onLogout();
	}, [onLogout]);

	return (
		<SideNavBarStyled isMinimize={isMinimize}>
			<Stack
				spacing={isMinimize ? 30 : 28}
				flexGrow={1}
				width="100%"
			>
				{!hideLogo && (
					<Stack alignItems="center">
						<LogoIcon sx={logoSxParams}/>
					</Stack>
				)}

				<Stack
					sx={{
						justifyContent: 'space-between',
						alignItems: 'center',
						flexGrow: 1,
						width: '100%',
					}}
				>
					<Stack
						sx={{
							justifyContent: 'space-between',
							alignItems: 'center',
							flexGrow: 1,
							width: '100%',
						}}
					>
						{Boolean(options?.length) && (
							<SideNavBarList options={options}/>
						)}
					</Stack>
					{!hideExit && (
						<Stack pb={30} pl={isMinimize ? 0 : 10} width='100%'>
							<SideNavBarLink
								defaultActive
								to={''}
								label={'Exit'}
								icon={ExitOutlinedIcon}
								isMinimize={isMinimize}
								onClick={handleLogout}
							/>
						</Stack>
					)}
				</Stack>
			</Stack>
		</SideNavBarStyled>
	);
});
