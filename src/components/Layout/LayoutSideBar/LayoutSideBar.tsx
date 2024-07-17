import Stack from "@mui/material/Stack";
import { FC, ReactNode } from 'react';

import Header from "@/components/Header";
import { Layout } from "@/components/Layout";
import { SideNavBar } from "@/components/SideNavBar";

import { ContainerStyled } from "./styled.tsx";

interface ILayoutSideBarProps {
    children: ReactNode;
}

export const LayoutSideBar: FC<ILayoutSideBarProps> = ({ children }) => {
    return (
        <Layout>
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
                        sx={{
                            height: "100%",
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {children}
                    </Stack>
                </ContainerStyled>
            </Stack>
        </Layout>
    );
};