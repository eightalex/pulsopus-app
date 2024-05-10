import { PersonOutlinedIcon } from '@/icons';
import { IUser, IUserAuth } from '@/interfaces';
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar';
import { FC, memo, MouseEvent } from 'react';

export interface IUserAvatarProps extends Omit<AvatarProps, 'sx' | 'onClick'> {
	user: IUser | IUserAuth;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	sx?: AvatarProps['sx'];
}

const UserAvatar: FC<IUserAvatarProps> = ({ user, onClick, sx = {} }) => {

	return (
		<MuiAvatar
			alt={user.firstName}
			src={user.avatar}
			onClick={onClick}
			sx={{
				cursor: onClick ? 'pointer' : 'default',
				...sx,
			}}
		>
			<PersonOutlinedIcon/>
		</MuiAvatar>
	);
};

export default memo(UserAvatar);
