import { SideNavBarLink } from '@/components/SideNavBar/SideNavBarLink';
import { sideNavOptions } from '@/constants/navBar';
import { useStores, useWindowSize } from '@/hooks';
import { ExitOutlinedIcon, LogoIcon } from '@/icons';
import Stack from '@mui/material/Stack';
import { FC, memo, useMemo } from 'react';
import { SideNavBarList } from './SideNavBarList';
import { SideNavBarStyled } from './styled';
import { ISideNavBarProps } from './types';

const SideNavBar: FC<ISideNavBarProps> = ({ options = sideNavOptions, hideLogo, hideExit }) => {
	const { rootStore: { authStore: { onLogout } } } = useStores();
	const { size: { width }, breakpointSizes } = useWindowSize();

	const isMinimize = useMemo(
		() => width <= breakpointSizes.xl,
		[width, breakpointSizes]);

	const logoSxParams = useMemo(() => ({
		width: isMinimize ? 74 : 134,
		height: isMinimize ? 10 : 18,
	}), [isMinimize]);

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
					{Boolean(options?.length) && (
						<SideNavBarList options={options}/>
					)}

					{!hideExit && (
						<Stack pb={30} pl={isMinimize ? 0 : 10} width='100%'>
							<SideNavBarLink
								to="exit"
								label={'Exit'}
								icon={ExitOutlinedIcon}
								onClick={onLogout}
								defaultActive
							/>
						</Stack>
					)}
				</Stack>

			</Stack>
		</SideNavBarStyled>
	);
};

export default memo(SideNavBar);
