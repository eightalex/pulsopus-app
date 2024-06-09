import { flexRender } from "@tanstack/react-table";
import { FC } from "react";

import { TableHeadRowStyled, TableHeadStyled } from "./styled.tsx";
import { TableHeadCell } from "./TableHeadCell";
import { ITableHeadProps } from "./types.ts";

export const TableHead: FC<ITableHeadProps> = ({ table }) => {
    return (
        <>
            {table.getHeaderGroups().map(headerGroup => (
                <colgroup>
                    {headerGroup.headers.map(() => <col/>)}
                </colgroup>
            ))}
            <TableHeadStyled>
                {table.getHeaderGroups().map(headerGroup => (
                    <TableHeadRowStyled key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            if(header.isPlaceholder) return null;
                            console.log('header', header);
                            console.log('header.column.columnDef.header', header.column.columnDef.header);
                            console.log('header.getContext()', header.getContext());
                            return (
                                <TableHeadCell
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    content={flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    sortDirection={header.column.getIsSorted()}
                                    onClick={header.column.getToggleSortingHandler()}
                                    disableSortView={!header.column.getCanSort()}
                                />
                            );
                        })}
                    </TableHeadRowStyled>
                ))}
            </TableHeadStyled>
        </>
    );
};