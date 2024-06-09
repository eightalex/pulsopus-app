import { flexRender } from "@tanstack/react-table";
import { FC } from "react";

import Typography from "@/components/Typography";

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
                    <TableBodyRowStyled key={row.id} >
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
};