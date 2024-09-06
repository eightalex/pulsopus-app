import { styled } from '@mui/material/styles';
import TableHead from "@mui/material/TableHead";
import TableRow, { TableRowProps } from "@mui/material/TableRow";

export const TableHeadStyled = styled(TableHead)({
    height: 'auto',
    minHeight: 48,
});

export const TableHeadRowStyled = styled((props: TableRowProps) =>
    <TableRow {...props} />
)({
    minHeight: 48,
    height: 'auto',
});