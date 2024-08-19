import Stack, { StackProps } from "@mui/material/Stack";
import { styled } from '@mui/material/styles';
export const TablePaginationStyled = styled(Stack)(({ theme: { spacing } }) => ({
    width: '100%',
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 2,
    padding: spacing(6, 0),
}));

export const TablePaginationRowStyled = styled(
    (props: StackProps) => <Stack {...props} direction='row'/>
)({
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
});