import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/system';

export const SelectActionRowStyled = styled(
    (props: StackProps) => <Stack spacing={1.5} direction='row' {...props} />
)(({ theme: { spacing } }) => ({
    cursor: 'pointer',
    height: '100%',
    alignItems: 'center',
    padding: spacing(0),
}));