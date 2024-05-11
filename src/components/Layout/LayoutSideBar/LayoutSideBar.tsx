import Stack from "@mui/material/Stack";
import { FC, ReactNode } from 'react';

import { SideNavBar } from "@/components/SideNavBar";

interface ILayoutSideBarProps {
    children: ReactNode;
}
export const LayoutSideBar: FC<ILayoutSideBarProps> = ({ children }) => {
    return (
        <Stack
            direction='row'
            spacing={0}
            sx={{
                background: 'transparent',
                display: 'flex',
                width: '100%',
                height: '100%',
                flex: 1,
                overflow: 'hidden',
                flexDirection: 'column',
            }}
        >
            <SideNavBar/>
            <Stack
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                }}
            >
                {children}
            </Stack>
        </Stack>
    );
};