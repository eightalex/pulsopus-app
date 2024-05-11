import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface IRootWrapperProps {
    children: ReactNode;
}
export const RootWrapper: FC<IRootWrapperProps> = ({ children }) => {
    return (
        <Box
            sx={({ palette: { backgroundColorPrimary, typography } }) => ({
                position: 'relative',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: backgroundColorPrimary,
                color: typography.primary,
            })}
        >
            {children}
        </Box>
    );
};