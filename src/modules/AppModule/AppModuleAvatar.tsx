import Stack from '@mui/material/Stack';
import { memo, useCallback } from 'react';

import { NavLink } from '@/components/NavLink';
import UserAvatarDropdown from '@/components/UserAvatarDropdown';
import { useDispatch, useSelector } from '@/hooks';
import { ExitOutlinedIcon } from '@/icons';
import { ThemeSwitch } from '@/modules/ThemeSwitch';
import { onLogout, selectAuthUser } from "@/stores/auth";

export const AppModuleAvatar = memo(() => {
	const dispatch = useDispatch();
	const user = useSelector(selectAuthUser);

	const handleProfile = useCallback(() => {
		alert('handleProfile');
	}, []);

	const handleLogout = useCallback(() => {
		alert('handleLogout');
		dispatch(onLogout());
	}, [dispatch]);

	return (
		<Stack spacing={1}>
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
		</Stack>
	);
});
