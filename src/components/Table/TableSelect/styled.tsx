import Select, { SelectProps } from "@mui/material/Select";
import { styled } from '@mui/system';

import { ETableSelectType } from "@/components/Table/TableSelect";

interface ITableHeadSelectStyledProps {
    variant?: ETableSelectType;
}

export const TableHeadSelectStyled = styled(
    (props: Omit<SelectProps, 'variant'>) =>
        <Select
            variant='filled'
            MenuProps={{
                sx: ({ extendPalette }) => ({
                    '& .MuiMenu-paper': {
                        WebkitTextFillColor: extendPalette.autocompleteOptionTextDefault,
                        borderRadius: 0,
                        backgroundColor: 'transparent',
                        marginTop: 0.5,
                        overflow: 'visible'
                    },
                    '& .MuiList-root': {
                        minWidth: 'unset',
                        width: 'calc(100% + 8px)',
                        transform: 'translateX(-4px)',
                    },
                    '& .MuiMenuItem-root': {
                        '&:hover': {
                            backgroundColor: extendPalette.autocompleteOptionHover,
                        },
                    },
                    '&[aria-selected="true"]': {
                        backgroundColor: extendPalette.autocompleteOptionActive,
                    },
                    '&[aria-selected="true"].Mui-focused': {
                        backgroundColor: extendPalette.autocompleteOptionPressed,
                    },
                    '& .Mui-selected': {
                        backgroundColor: extendPalette.autocompleteOptionActive,
                    },
                })
            }}
            fullWidth={true}
            {...props}
        />,
    {
        shouldForwardProp: prop => prop !== 'variant',
    }
)<ITableHeadSelectStyledProps>(({ variant, theme: { spacing } }) => ({
    color: 'inherit',
    width: '100%',
    height: 'auto',
    minHeight: variant === ETableSelectType.HEAD ? 44 : 36,
    maxHeight: variant === ETableSelectType.HEAD ? '100%' : 36,
    flexGrow: 1,
    outline: 'none',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 0,
    borderWidth: variant === ETableSelectType.HEAD ? 4 : 0,
    padding: 0,

    '&:hover': {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        WebkitTextFillColor: 'initial',
    },

    '& .MuiSelect-select': {
        WebkitTextFillColor: 'initial',
        padding: spacing(1.5, 3),
    },

    '&.Mui-disabled': {
        color: 'unset',
        "& .MuiSelect-icon": {
            opacity: 0,
        },
        '& .MuiSelect-select': {
            WebkitTextFillColor: 'unset',
        },
    },
}));