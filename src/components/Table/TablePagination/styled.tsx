import Stack, { StackProps } from "@mui/material/Stack";
import { styled } from '@mui/system';
export const TablePaginationStyled = styled(Stack)({
    width: '100%',
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 2,
    paddingBottom: 30,
});

export const TablePaginationRowStyled = styled(
    (props: StackProps) => <Stack {...props} direction='row'/>
)({
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
});