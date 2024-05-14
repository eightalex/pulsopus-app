import Stack from '@mui/material/Stack';
import { useCallback, useMemo } from "react";
import { Location, useLocation, useNavigate } from 'react-router-dom';

import ButtonIcon from '@/components/ButtonIcon';
import { NavLink } from "@/components/NavLink";
import Typography from '@/components/Typography';
import UserAvatarDropdown from "@/components/UserAvatarDropdown/UserAvatarDropdown.tsx";
import { NAV_LABELS_BY_PATH } from "@/constants/navBar.ts";
import { PROFILE_ROUTE } from "@/constants/routes.ts";
import { useDispatch, useSelector } from "@/hooks";
import { ArrowLeftIcon, ExitOutlinedIcon } from '@/icons';
import { ThemeSwitch } from "@/modules/ThemeSwitch";
import { onLogout, selectAuthUser } from "@/stores/auth";

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

const Header = () => {
	const location: Location<ILocationState> = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(selectAuthUser);

	const userId = useMemo(() => location?.state?.id, [location]);

	const pageLabel = useMemo(() => getPageLabel(location?.pathname), [location]);

	const handleGoBack = useCallback(() => {
		alert('goBack');
	}, []);

	const handleProfile = useCallback(() => {
		navigate(PROFILE_ROUTE);
	}, [navigate]);

	const handleLogout = useCallback(() => {
		dispatch(onLogout());
	}, [dispatch]);

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems='flex-end'
			spacing={2}
			component={'header'}
		>
			<Stack
				spacing={2}
				direction="row"
				alignItems='flex-end'
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

			<Stack >
				{user && (
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
};

export default Header;
