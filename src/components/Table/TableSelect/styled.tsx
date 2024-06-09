import Select, { SelectProps } from "@mui/material/Select";
import { styled } from '@mui/system';

export const SelectStyled = styled(
    (props: SelectProps) => <Select {...props} variant="filled"/>
)({
    width: '100%',
    height: 'auto',
    maxHeight: '100%',
    flexGrow: 1,
    zIndex: 0,
});
//
// export const TableBodyRowStyled = styled(TableRow)(({ theme: { extendPalette } }) => ({
//     height: DEFAULT_ROW_BODY_HEIGHT,
//     maxHeight: DEFAULT_ROW_BODY_HEIGHT,
//     width: '100%',
//     border: '1px solid transparent',
//
//     "&:hover td": {
//         borderColor: extendPalette.tableBodyBorderHover,
//         backgroundColor: extendPalette.tableBodyBackgroundHover,
//     }
// }));
//
// export const TableBodyCellStyled = styled(
//     TableCell,
//     {
//         shouldForwardProp: propName => propName !== 'selected',
//     }
// )<ITableBodyCellStyledProps>(({ selected = false, theme: { spacing, extendPalette } }) => ({
//     boxSizing: 'border-box',
//     borderWidth: 1,
//     borderStyle: 'solid',
//     borderColor: selected
//         ? extendPalette.tableBodyBorderSelect
//         : extendPalette.tableBodyBorderDefault,
//     backgroundColor: selected
//         ? extendPalette.tableBodyBackgroundSelect
//         : extendPalette.tableBodyBackgroundDefault,
//     padding: spacing(0.5, 3),
//     height: 'auto',
//     overflow: 'auto',
//     minHeight: DEFAULT_ROW_BODY_HEIGHT,
//
//     '&:hover': {
//         borderColor: extendPalette.tableBodyBorderHover,
//         backgroundColor: extendPalette.tableBodyBackgroundHover,
//     }
// }));