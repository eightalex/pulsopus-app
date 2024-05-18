import Stack from "@mui/material/Stack";
import { FC } from "react";

import { ContentActionsContainerStyled, ContentContainerStyled } from "./styled.tsx";
import { IContentContainerProps } from "./types.ts";

export const ContentContainer: FC<IContentContainerProps> = (props) => {
    const { children, actions } = props;
    return (
        <ContentContainerStyled>
            {actions && (
                <ContentActionsContainerStyled>
                    {actions}
                </ContentActionsContainerStyled>
            )}
            {children && <Stack direction='row'>{children}</Stack>}
        </ContentContainerStyled>
    );
};