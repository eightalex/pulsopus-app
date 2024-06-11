import { flexRender } from "@tanstack/react-table";

import Typography from "@/components/Typography";

import { TableBodyCellStyled, TableBodyRowStyled, TableBodyStyled } from "./styled.tsx";
import { ITableBodyProps } from "./types.ts";

export function TableBody<Data>({ table, maxPerPage = 0, styleOverrides }: ITableBodyProps<Data>) {
    const max = maxPerPage || table.getRowModel().rows?.length || 100;
    return (
        <TableBodyStyled>
        {table
            .getRowModel()
            .rows.slice(0, max)
            .map(row => {
                const sx = styleOverrides?.(row) || {};
                return (
                    <TableBodyRowStyled
                        key={row.id}
                        selected={row.getIsSelected()}
                        sx={sx}
                    >
                        {row.getVisibleCells().map((cell, index) => {
                            return (
                                <TableBodyCellStyled
                                    id={cell.id}
                                    key={cell.id}
                                    scope={`${!index ? 'row': ''}`}
                                    selected={row.getIsSelected()}
                                >
                                    <Typography
                                        component='span'
                                        color='inherit'
                                        sx={{
                                            color: 'inherit',
                                        }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Typography>
                                </TableBodyCellStyled>
                            );
                        })}
                    </TableBodyRowStyled>
                );
            })}
        </TableBodyStyled>
    );
}