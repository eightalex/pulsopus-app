import { Stack } from "@mui/material";
import { FC, useMemo } from 'react';

import { ILoaderWrapperProps } from "@/components/Loader/types.ts";

export const LoaderWrapper: FC<ILoaderWrapperProps> = ({ children, fullSize = true  }) => {
    const wrapperStyled = useMemo(() => {
        if (fullSize) {
            return {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
            };
        }

        return {
            width: 'auto',
            height: 'auto',
        };
    }, [fullSize]);
    return (
        <Stack
            sx={{
                ...wrapperStyled,
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
            }}
        >
            {children}
        </Stack>
    );
};