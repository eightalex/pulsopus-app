import Stack from '@mui/material/Stack';
import { FC, useMemo } from 'react';

import { SideNavBarLink } from '@/components/SideNavBar/SideNavBarLink';
import { LOGOUT_ROUTE } from "@/constants/routes.ts";
import { getSidebarNavLinksByRoles } from "@/helpers/getSidebarNavLinksByRoles.ts";
import { useSelector, useWindowSize } from '@/hooks';
import { ExitOutlinedIcon, LogoIcon } from '@/icons';
import { onLogout, selectAuthRoles } from "@/stores/auth";

import { SideNavBarList } from './SideNavBarList';
import { SideNavBarStyled } from './styled';
import { ISideNavBarProps } from './types';

export const SideNavBar: FC<ISideNavBarProps> = ({
	hideLogo = false,
	hideExit = false,
}) => {
	const userRoles = useSelector(selectAuthRoles);
	const { size: { width }, breakpointSizes } = useWindowSize();

	const isMinimize = useMemo(
		() => width <= breakpointSizes.xl,
		[width, breakpointSizes]);

	const logoSxParams = useMemo(() => ({
		width: isMinimize ? 74 : 134,
		height: isMinimize ? 10 : 18,
	}), [isMinimize]);

	const options = getSidebarNavLinksByRoles(userRoles || []);

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
								to={LOGOUT_ROUTE}
								label={'Exit'}
								icon={ExitOutlinedIcon}
								defaultActive
							/>
						</Stack>
					)}
				</Stack>

			</Stack>
		</SideNavBarStyled>
	);
};
