import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/system';

import { CONTENT_ACTION_WIDTH } from '@/constants/size.ts';

export const ContentSwapperStyled = styled(({ ...props }: StackProps) => <Stack
        {...props}
        spacing={2}
    />
)(({ theme: { breakpoints } }) => ({
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    height: '100%',

    [breakpoints.down('xxl')]: {
        flexDirection: 'column',
    },
}));

export const ContentSwapperMainStyled = styled(Stack)(({ theme: { breakpoints } }) => ({
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    maxWidth: `${CONTENT_ACTION_WIDTH}px`,

    [breakpoints.down('xlg')]: {
        maxWidth: '100%',
    },
}));

export const ContentSwapperSideStyled = styled(Stack)(({ theme: { breakpoints, spacing } }) => ({
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    width: 'auto',
    paddingLeft: spacing(9),

    [breakpoints.down('xxl')]: {
        width: '100%',
        alignItems: 'flex-start',
        paddingTop: spacing(6),
        paddingLeft: 0,
    },
}));
