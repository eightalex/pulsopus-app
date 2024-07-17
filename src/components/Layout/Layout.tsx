import Box from '@mui/material/Box';
import { FC, ReactNode } from 'react';

interface ILayoutProps {
    children: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flex: '1',
                overflow: 'hidden',
                flexDirection: 'column',
            }}
        >
            {children}
        </Box>
    );
};