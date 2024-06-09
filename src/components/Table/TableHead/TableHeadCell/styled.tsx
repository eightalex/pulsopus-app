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
    border: '2px solid #000',
    cursor: canAction ? 'pointer' : 'default',
    // backgroundColor: 'transparent',
    backgroundColor: palette.tableHeadBackgroundColor,
    userSelect: 'none',
    height: 'auto',
    minHeight: '48px',
}));
