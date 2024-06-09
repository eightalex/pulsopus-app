import TableHead from "@mui/material/TableHead";
import TableRow, { TableRowProps } from "@mui/material/TableRow";
import { styled } from '@mui/system';

// export const TableHeadStyled = styled('thead')({});
// export const TableHeadRowStyled = styled('tr')({});

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