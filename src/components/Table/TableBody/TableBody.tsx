import { flexRender } from "@tanstack/react-table";
import { FC } from "react";

import { TableBodyCellStyled, TableBodyRowStyled, TableBodyStyled } from "./styled.tsx";
import { ITableBodyProps } from "./types.ts";

export const TableBody: FC<ITableBodyProps> = ({ table, maxPerPage = 0 }) => {
    const max = maxPerPage || table.getRowModel().rows?.length || 100;
    return (
        <TableBodyStyled>
        {table
            .getRowModel()
            .rows.slice(0, max)
            .map(row => {
                return (
                    <TableBodyRowStyled key={row.id}>
                        {row.getVisibleCells().map(cell => {
                            return (
                                <TableBodyCellStyled key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableBodyCellStyled>
                            );
                        })}
                    </TableBodyRowStyled>
                );
            })}
        </TableBodyStyled>
    );
};