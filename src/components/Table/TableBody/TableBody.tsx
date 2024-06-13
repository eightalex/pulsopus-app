import { flexRender } from "@tanstack/react-table";
import { isValidElement } from "react";

import Typography from "@/components/Typography";

import { TableBodyCellStyled, TableBodyRowStyled, TableBodyStyled } from "./styled.tsx";
import { ITableBodyProps } from "./types.ts";

export function TableBody<Data>({ getRef, table, maxPerPage = 0, styleOverrides = {} }: ITableBodyProps<Data>) {
    const max = maxPerPage || table.getRowModel().rows?.length || 100;
    return (
        <TableBodyStyled
            ref={(instance) => {
                getRef?.(instance as HTMLTableSectionElement);
            }}
        >
        {table
            .getRowModel()
            .rows.slice(0, max)
            .map(row => {
                const sx =  typeof styleOverrides === 'function'
                    ? styleOverrides?.(row) || {}
                    : styleOverrides;
                return (
                    <TableBodyRowStyled
                        key={row.id}
                        selected={row.getIsSelected()}
                        sx={sx}
                    >
                        {row.getVisibleCells().map((cell, index) => {

                            const comp = cell.column.columnDef.cell?.(cell.getContext())  as unknown;
                            const isValidComp = isValidElement(comp);
                            const renderComponent = isValidComp ? comp : (
                                <Typography
                                    component='span'
                                    color='inherit'
                                    sx={({ spacing }) => ({
                                        padding: spacing(0.5, 3),
                                        color: 'inherit',
                                    })}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </Typography>
                            );

                            return (
                                <TableBodyCellStyled
                                    id={cell.id}
                                    key={cell.id}
                                    scope={`${!index ? 'row': ''}`}
                                    selected={row.getIsSelected()}
                                >
                                    {renderComponent}
                                </TableBodyCellStyled>
                            );
                        })}
                    </TableBodyRowStyled>
                );
            })}
        </TableBodyStyled>
    );
}