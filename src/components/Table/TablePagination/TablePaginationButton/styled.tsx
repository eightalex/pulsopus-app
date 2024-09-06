import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';

interface ITablePaginationButtonPageStyledProps {
    selected?: boolean;
}

export const TablePaginationButtonTitleStyled = styled(
    Button
)(({ theme: { spacing } }) => ({
    padding: spacing(2),
    height: 40,
    alignItems: 'center',
    color: '#CBCBCB',
    userSelect: 'none',
    cursor: 'pointer',

    '& svg': {
        fill: '#CBCBCB',
    },

    '&:hover': {
        outline: 'none',
        color: '#219653',
        borderColor: 'transparent',
        '& svg': {
            fill: '#219653',
        },
    },

    '&:active': {
        outline: 'none',
        borderColor: 'transparent',
        background: 'transparent'
    },
    '&:focus': {
        outline: 'none',
        borderColor: 'transparent',
        background: 'transparent'
    },

    '&.Mui-disabled': {
        color: '#757575',
        '& svg': {
            fill: '#757575',
        },
    }
}));

export const TablePaginationButtonPageStyled = styled(
    TablePaginationButtonTitleStyled,
    {
        shouldForwardProp: prop => prop !== 'selected',
    }
)<ITablePaginationButtonPageStyledProps>(({ selected, theme: { spacing } }) => ({
    padding: spacing(2.5, 2),
    color: selected ? '#219653' : '#D0D0D0',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    minWidth: 42,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    background: selected ? '#62626266' : 'transparent',
    transition: 'all .25s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
        color: '#219653',
        background: selected ? '#62626266' : 'transparent',
    },
    '&:active': {
        color: '#219653',
        background: '#62626266',
    },
    '&:focus': {
        color: '#219653',
        background: '#62626266',
    },
}));