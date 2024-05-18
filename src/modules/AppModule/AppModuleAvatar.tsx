import { NavLink } from '@/components/NavLink';
import UserAvatarDropdown from '@/components/UserAvatarDropdown';
import { useStores } from '@/hooks';
import { ExitOutlinedIcon } from '@/icons';
import { ThemeSwitch } from '@/modules/ThemeSwitch';
import Stack from '@mui/material/Stack';
import { memo, useCallback } from 'react';

export const AppModuleAvatar = memo(() => {
	const { rootStore: { authStore: { onLogout, user } } } = useStores();
	const handleProfile = useCallback(() => {
	}, []);

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
						onClick={onLogout}
						isActive
					/>
				</Stack>
			</UserAvatarDropdown>
		</Stack>
	);
});
