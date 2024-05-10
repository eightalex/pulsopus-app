import { FC, memo, ReactNode } from 'react';
import SidePanel from '@/components/SidePanel';

interface IAppLayoutProps {
	children: ReactNode;

}

const AppLayout: FC<IAppLayoutProps> = ({ children }) => {
	return (
		<SidePanel>
			{children}
		</SidePanel>
	);
};

export default memo(AppLayout);
