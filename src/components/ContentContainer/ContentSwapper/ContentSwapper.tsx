import Stack from "@mui/material/Stack";
import { FC, ReactNode } from "react";

import { ContentSwapperMainStyled, ContentSwapperSideStyled, ContentSwapperStyled } from "./styled.tsx";


interface IContentSwapperProps {
    content: ReactNode;
    children: ReactNode;
}
export const ContentSwapper: FC<IContentSwapperProps>  = ({ children, content }) => {
    return (
        <ContentSwapperStyled>
            <ContentSwapperMainStyled>
                <Stack>{children}</Stack>
            </ContentSwapperMainStyled>
            <ContentSwapperSideStyled>
                <Stack>{content}</Stack>
            </ContentSwapperSideStyled>
        </ContentSwapperStyled>
    );
};