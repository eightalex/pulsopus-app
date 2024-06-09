import MuiTable, { TableProps } from '@mui/material/Table';
import { styled } from '@mui/system';

// export const TableStyled = styled('table')({
//     tableLayout: 'auto',
//     width: '100%',
//     textIndent: 0,
//     borderCollapse: 'collapse',
//     // borderSpacing: '2px',
//     // borderSpacing: 0,
//     borderSpacing: '2px 0',
//     // borderSpacing: '0 0',
//
//     // '&:is(td, th)': {
//     //     // borderStyle: 'solid',
//     //     // padding: '.5ch 1ch',
//     //     // borderColor: 'red',
//     //     // borderInlineWidth: '1px',
//     // },
//     //
//     // 'td:hover': {
//     //     background: '#666666',
//     // },
//     // 'tr:hover': {
//     //     background: '#E6E6E6',
//     // },
//     //
//     // '&:has(:is(td,th):nth-child(1):hover col:nth-child(1)': {
//     //     background: '#E6E6E6',
//     // },
//
//     //
//     border: "1px solid red",
//     // border: "none",
//     // boxSizing: 'border-box',
//     //
//     '& *': {
//         boxSizing: 'border-box',
//     }
// });

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