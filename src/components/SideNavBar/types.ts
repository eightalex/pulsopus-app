import { TIcon } from '@/icons';

export interface ISideNavBarLink {
	icon?: TIcon;
	label: string;
	id?: string;
	path: string;
	disabled?: boolean;
}

export interface ISideNavBarListItemProps {
	item: ISideNavBarLink;
	isActive?: boolean;
	onClick?: (item: ISideNavBarLink) => void;
}

export interface ISideNavBarListProps {
	options: ISideNavBarLink[];
}

export interface ISideNavBarProps extends Partial<ISideNavBarListProps> {
	hideLogo?: boolean;
	hideExit?: boolean;
}
