import Select, { SelectProps } from "@mui/material/Select";
import { styled } from '@mui/system';

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
        />
)(({ theme: { spacing } }) => ({
    width: '100%',
    height: 'auto',
    maxHeight: '100%',
    flexGrow: 1,
    outline: 'none',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 0,
    borderWidth: 4,
    padding: 0,

    '&:hover': {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },

    '& .MuiSelect-select': {
        padding: spacing(1.5, 3),
    },
}));