import Stack from '@mui/material/Stack';
import { observer } from "mobx-react";
import { useCallback, useMemo } from "react";
import { Location, useLocation, useNavigate } from 'react-router-dom';

import ButtonIcon from '@/components/ButtonIcon';
import { NavLink } from "@/components/NavLink";
import Typography from '@/components/Typography';
import UserAvatarDropdown from "@/components/UserAvatarDropdown/UserAvatarDropdown.tsx";
import { NAV_LABELS_BY_PATH } from "@/constants/navBar.ts";
import { PROFILE_ROUTE } from "@/constants/routes.ts";
import { useStores } from "@/hooks";
import { ArrowLeftIcon, ExitOutlinedIcon } from '@/icons';
import { ThemeSwitch } from "@/modules/ThemeSwitch";

interface ILocationState {
	id: string;
}

const getPageLabel = (path = '') => {
	return Object
		.entries(NAV_LABELS_BY_PATH)
		.reduce((label, [k, v]) => {
			if(!path.includes(k)) return label;
			return v;
		}, '');
};

const Header = observer(() => {
	const location: Location<ILocationState> = useLocation();
	const navigate = useNavigate();
	const {
		rootStore: {
			authStore: { user, onLogout },
			routeStore: { goBack },
			userDiagramStore: {
				targetId: selectedDiagramUserId,
			}
		}
	} = useStores();

	const userId = useMemo(() => location?.state?.id || selectedDiagramUserId, [location, selectedDiagramUserId]);

	const pageLabel = useMemo(() => getPageLabel(location?.pathname), [location]);

	const handleGoBack = useCallback(() => {
		goBack();
	}, [goBack]);

	const handleProfile = useCallback(() => {
		navigate(PROFILE_ROUTE);
	}, [navigate]);

	const handleLogout = useCallback(() => {
		onLogout();
	}, [onLogout]);

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems='flex-end'
			spacing={2}
			component={'header'}
		>
			<Stack
				justifyContent='flex-end'
			>
				<Stack
					direction="row"
					alignItems='center'
					spacing={2}
				>
					{Boolean(userId) && (
						<ButtonIcon
							onClick={handleGoBack}
							title={'Back'}
							tooltipProps={{
								title: 'Back',
								placement: 'bottom',
							}}
							icon={<ArrowLeftIcon/>}
							sx={{
								border: 'none',
								outline: 'none',
								backgroundColor: 'transparent',
							}}
						/>
					)}

					<Typography variant="head1" lineHeight={1}>
						{pageLabel?.toUpperCase()}
					</Typography>
				</Stack>
			</Stack>

			<Stack >
				{Boolean(user) && (
					<UserAvatarDropdown
						user={user}
						onProfileClick={handleProfile}
					>
						<Stack spacing={3}>
							<ThemeSwitch/>
							<NavLink
								to="exit"
								label={'Exit'}
								icon={ExitOutlinedIcon}
								onClick={handleLogout}
								isActive
							/>
						</Stack>
					</UserAvatarDropdown>
				)}
			</Stack>
		</Stack>
	);
});

export default Header;
