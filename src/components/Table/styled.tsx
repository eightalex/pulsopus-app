import { styled } from '@mui/system';

export const TableStyled = styled('table')({
    tableLayout: 'auto',
    width: '100%',
    textIndent: 0,
    borderCollapse: 'collapse',
    // borderSpacing: '2px',
    borderSpacing: '2ch 0',
    borderColor: 'red',
    backgroundColor: 'green',

    '&:is(td, th)': {
        borderStyle: 'solid',
        padding: '.5ch 1ch',
        borderColor: 'red',
        borderInlineWidth: '1px',
    },

    // borderSpacing: 0,
    //
    // border: '1px solid transparent',
    // boxSizing: 'border-box',
    //
    '& *': {
        boxSizing: 'border-box',
    }
});

/**
 *   &:is(td, th) {
 *     border-style: solid;
 *     padding: .5ch 1ch;
 *   }
 *   */