import MuiTable, { TableProps } from '@mui/material/Table';
import { styled } from '@mui/system';

export const TableStyled = styled(
    (props: TableProps) => <MuiTable size="small" {...props} />
)({
    overflow: 'visible',
    tableLayout: 'fixed',
    width: '100%',
    height: 'auto',
    flex: 1,
    borderCollapse: 'separate',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
        display: 'none',
    }
});