import Box from '@mui/material/Box';
import { FC, ReactNode } from 'react';

import SidePanel from "@/components/SidePanel";

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
            {/*<SidePanel>*/}
                {children}
            {/*</SidePanel>*/}
        </Box>
    );
};