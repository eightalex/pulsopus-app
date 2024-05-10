import Typography from '@/components/Typography';
import { IUserAvatarProps, UserAvatar } from '@/components/UserAvatar';
import { Divider, Fade, Menu, Stack } from '@mui/material';
import { MouseEvent, Children, FC, memo, ReactNode, useCallback, useMemo, useState } from 'react';

interface ICallbackChildParams {
	onClose: () => void;
}

type TCallbackChild = (params: ICallbackChildParams) => ReactNode;

export interface IUserAvatarDropdownProps extends Pick<IUserAvatarProps, 'user'> {
	onProfileClick: () => void;
	children?: ReactNode | TCallbackChild;
}

const UserAvatarDropdown: FC<IUserAvatarDropdownProps> = ({ user, onProfileClick, children }) => {
	const [targetElement, setTargetElement] = useState<null | HTMLElement>(null);

	const name = useMemo(() => `${user.firstName} ${user.lastName}`, [user])

	const userEmail = useMemo(() => 'username' in user ? user.username : user.email, [user]);

	const handleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		setTargetElement(event.currentTarget);
	}, []);

	const handleClose = useCallback(() => {
		setTargetElement(null);
	}, []);

	const handleAvatarClick = useCallback(() => {
		onProfileClick?.();
		handleClose();
	}, [onProfileClick, handleClose]);

	return (
		<>
			<UserAvatar
				user={user}
				onClick={handleOpen}
			/>
			<Menu
				anchorEl={targetElement}
				open={Boolean(targetElement)}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				<Stack
					spacing={3}
					divider={<Divider variant="fullWidth"/>}
				>
					<Stack
						direction="row"
						spacing={3}
						onClick={handleAvatarClick}
						sx={({ spacing }) => ({
							padding: spacing(3, 6, 0, 6),
							alignItems: 'center',
							cursor: onProfileClick ? 'pointer' : 'default',
						})}
					>
						<UserAvatar user={user}/>
						<Stack spacing={0}>
							<Typography variant="text">{name}</Typography>
							{userEmail&& (
								<Typography variant="caption1">{userEmail}</Typography>
							)}
						</Stack>
					</Stack>
					{children && (
						<Stack
							spacing={3}
							sx={({ spacing }) => ({
								padding: spacing(2, 0, 5, 0),
							})}
						>
							{Children.map(typeof children === 'function' ? children({ onClose: handleClose }) : children, (child) => {
								return (
									<Stack
										sx={({ spacing }) => ({
											padding: spacing(0, 6)
										})}
									>
										{child}
									</Stack>
								);
							})}
						</Stack>
					)}
				</Stack>
			</Menu>
		</>
	);
};

export default memo(UserAvatarDropdown);
