import Box from '@mui/material/Box';
import { FC, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { DOCUMENTS_TITLES } from "@/constants/routes.ts";


interface ILayoutProps {
    children: ReactNode;
}
export const Layout: FC<ILayoutProps> = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        document.title = DOCUMENTS_TITLES[location.pathname.slice(1)] || DOCUMENTS_TITLES.ROOT_ROUTE;
    }, [location.pathname]);

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