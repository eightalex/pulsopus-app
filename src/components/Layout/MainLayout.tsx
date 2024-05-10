import { FC, memo, ReactNode } from 'react';
import Header from '@/components/Header';
import Stack from '@mui/material/Stack';

interface IMainLayoutProps {
	children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
	return (
		<Stack
			height="100%"
			spacing={1}
		>
			<Header/>
			<Stack flexGrow={1}>
				{children}
			</Stack>
		</Stack>
	);
};

export default memo(MainLayout);
