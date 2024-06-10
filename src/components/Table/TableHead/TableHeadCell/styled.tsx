import Stack, { StackProps } from "@mui/material/Stack";
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import { styled } from '@mui/system';

import { DEFAULT_ROW_HEAD_HEIGHT } from "@/components/Table";

interface ITableHeadCellStyledProps {
    canAction: boolean;
    sx: StackProps['sx'];
}

export const TableHeadCellTitleStyled = styled(
    (props: StackProps) =>
        <Stack {...props}
               component={'div'}
               direction='row'
               spacing={1}
        />
)(({ theme: { spacing } }) => ({
    boxSizing: 'border-box',
    padding: spacing(3, 2.5),
    alignItems: 'center',
    justifyContent: 'space-between',
}), { name: 'TableHeadCellTitleStyled' });

// export const TableHeadCellStyled = styled(
//     'th',
//     { shouldForwardProp: prop => prop !== 'canAction' }
// )<ITableHeadCellStyledProps>(({ canAction = false, theme: { palette }  }) => ({
//     // boxSizing: 'border-box',
//     // padding: 0,
//     // userSelect: 'none',
//     // height: 'auto',
//     // minHeight: '48px',
//
//     // borderWidth: '2px',
//     // borderStyle: 'solid',
//     // borderColor: '#000',
//     // cursor: canAction ? 'pointer' : 'default',
//
//     // backgroundColor: palette.tableHeadBackgroundDefault,
//
//     // '&:first-of-type': {
//     //     borderLeftColor: palette.tableHeadBackgroundDefault,
//     // },
//     // '&:last-of-type': {
//     //     borderRightColor: palette.tableHeadBackgroundDefault,
//     // }
// }));

export const TableHeadCellStyled = styled(
    (props: TableCellProps) => <TableCell {...props} component='th' />,
    { shouldForwardProp: prop => prop !== 'canAction' }
)<ITableHeadCellStyledProps>(({ canAction = false, theme: { palette, spacing } }) => ({
    height: DEFAULT_ROW_HEAD_HEIGHT,
    boxSizing: 'border-box',
    padding: 0,
    backgroundColor: palette.tableHeadBackgroundDefault,
    cursor: canAction ? 'pointer' : 'default',
    borderWidth: '1px',
    borderBottomWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#000',

    '&:first-of-type': {
        borderLeft: 'none',
    },
    '&:last-of-type': {
        borderRight: 'none',
    }
}));

