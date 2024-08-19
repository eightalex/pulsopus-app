import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { DEFAULT_ROW_BODY_HEIGHT } from "@/components/Table";

// export const TableBodyStyled = styled('tbody')({});
// export const TableBodyCellStyled = styled('td')({});
// export const TableBodyRowStyled = styled('tr')({});

interface ITableBodyCellStyledProps {
    selected?: boolean;
}

export const TableBodyStyled = styled(TableBody)({
    width: '100%',
    height: 'auto',
    maxHeight: '100%',
    flexGrow: 1,
    zIndex: 0,
    color: '#D0D0D0',
});

export const TableBodyRowStyled = styled(
    TableRow
)<ITableBodyCellStyledProps>(({ selected, theme: { extendPalette } }) => ({
    position: 'relative',
    zIndex: 0,
    height: DEFAULT_ROW_BODY_HEIGHT,
    maxHeight: DEFAULT_ROW_BODY_HEIGHT,
    width: '100%',
    border: '1px solid transparent',
    boxSizing: 'border-box',
    borderWidth: 1,
    borderStyle: 'solid',
    color: '#D0D0D0',
    borderColor: selected
        ? extendPalette.tableBodyBorderSelect
        : extendPalette.tableBodyBorderDefault,
    backgroundColor: selected
        ? extendPalette.tableBodyBackgroundSelect
        : extendPalette.tableBodyBackgroundDefault,

    "&:hover td": {
        borderColor: extendPalette.tableBodyBorderHover,
        backgroundColor: extendPalette.tableBodyBackgroundHover,
    },

    '&.Mui-selected': {
        backgroundColor: extendPalette.tableBodyBackgroundSelect,
    }
}));

export const TableBodyCellStyled = styled(
    TableCell,
    {
        shouldForwardProp: propName => propName !== 'selected',
    }
)<ITableBodyCellStyledProps>(({ theme: { extendPalette } }) => ({
    boxSizing: 'border-box',
    color: 'inherit',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'inherit',
    backgroundColor: 'inherit',
    padding: 0,
    height: 'auto',
    overflow: 'auto',
    minHeight: DEFAULT_ROW_BODY_HEIGHT,
    alignItems: 'center',

    '&:hover': {
        borderColor: extendPalette.tableBodyBorderHover,
        backgroundColor: extendPalette.tableBodyBackgroundHover,
    }
}));