import Stack, { StackProps } from "@mui/material/Stack";
import { styled } from '@mui/system';

interface ITableHeadCellStyledProps {
    canAction: boolean;
}

export const TableHeadCellTitleStyled = styled(
    (props: StackProps) =>
        <Stack {...props}
               component={'div'}
               direction='row'
               spacing={1}
    />
)(({ theme: { spacing } }) => ({
    padding: spacing(3, 3.5),
    alignItems: 'center',
    justifyContent: 'space-between',
}), { name: 'TableHeadCellTitleStyled' });

export const TableHeadCellStyled = styled(
    'th',
    { shouldForwardProp: prop => prop !== 'canAction' }
)<ITableHeadCellStyledProps>(({ canAction = false, theme: { palette }  }) => ({
    // borderWidth: '2px',
    // borderStyle: 'solid',
    // borderColor: '#000',
    // cursor: canAction ? 'pointer' : 'default',
    // backgroundColor: palette.tableHeadBackgroundColor,
    // userSelect: 'none',
    // height: 'auto',
    // minHeight: '48px',
    //
    // '&:first-of-type': {
    //     borderLeftColor: palette.tableHeadBackgroundColor,
    // },
    // '&:last-of-type': {
    //     borderRightColor: palette.tableHeadBackgroundColor,
    // }
}));
