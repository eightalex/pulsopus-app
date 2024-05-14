import Stack from "@mui/material/Stack";
import { FC, ReactNode } from 'react';

import Header from "@/components/Header";
import { ContainerStyled } from "@/components/Layout/LayoutSideBar/styled.tsx";
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
            }}
        >
            <SideNavBar/>
            <ContainerStyled>
                <Header/>
                <Stack
                    flexGrow={1}
                    height="100%"
                >
                    {children}
                </Stack>
            </ContainerStyled>
        </Stack>
    );
};