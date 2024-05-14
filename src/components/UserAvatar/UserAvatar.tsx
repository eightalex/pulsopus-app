import MuiAvatar, { AvatarProps } from '@mui/material/Avatar';
import { FC, memo, MouseEvent } from 'react';

import { PersonOutlinedIcon } from '@/icons';
import { IUser } from '@/interfaces/IUser.ts';

export interface IUserAvatarProps extends Omit<AvatarProps, 'sx' | 'onClick'> {
	user?: IUser;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	sx?: AvatarProps['sx'];
}

const defaultSrc = 'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png';

const UserAvatar: FC<IUserAvatarProps> = ({ user, onClick, sx = {} }) => {
	return (
		<MuiAvatar
			alt={user?.username}
			src={user?.avatar || defaultSrc}
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
