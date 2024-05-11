import { FC, memo, ReactNode } from 'react';

import { ISideNavBarProps,SideNavBar } from '@/components/SideNavBar';

import { SidePanelContentStyled, SidePanelWrapperStyled } from './styled';

interface ISidePanelProps extends ISideNavBarProps {
	children: ReactNode;
}

export const SidePanel: FC<ISidePanelProps> = memo(({ children }) => {
	return (
		<SidePanelWrapperStyled>
			<SideNavBar/>
			<SidePanelContentStyled>
				{children}
			</SidePanelContentStyled>
		</SidePanelWrapperStyled>
	);
});

export default SidePanel;
