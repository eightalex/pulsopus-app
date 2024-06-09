import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/system';

import { CONTENT_ACTION_WIDTH } from '@/constants/size.ts';

export const ContentContainerStyled = styled(
    (props: StackProps) => <Stack spacing={8} {...props} />
)(({ theme: { spacing } }) => ({
    flexGrow: 1,
    overflow: 'hidden',
    paddingTop: spacing(8),
    height: "100%",
    position: 'relative',
}));

export const ContentActionsContainerStyled = styled(
    (props: StackProps) => <Stack spacing={0} direction='row' {...props} />
)(({ theme: { breakpoints } }) => ({
    width: '100%',
	height: 'auto',
	maxWidth: `${CONTENT_ACTION_WIDTH}px`,
	[breakpoints.down('xlg')]: {
		maxWidth: '100%',
	},
}));