import { flexRender } from "@tanstack/react-table";
import { FC, HTMLProps } from "react";

import { DEFAULT_COLUMN_SIZE } from "@/components/Table";
import { TableHeadFilter } from "@/components/Table/TableHead/TableHeadFilter/TableHeadFilter.tsx";

import { TableHeadRowStyled, TableHeadStyled } from "./styled.tsx";
import { TableHeadCell } from "./TableHeadCell";
import { ITableHeadProps } from "./types.ts";

const getCellWidthStyle = (size?: number): HTMLProps<HTMLTableCellElement> => {
    if(!size || size === DEFAULT_COLUMN_SIZE) return {};
    return { width: `${size}px !important`, maxWidth: `${size}px !important` };
};

export const TableHead: FC<ITableHeadProps> = ({ table }) => {
    return (
        <>
            {table.getHeaderGroups().map(headerGroup => (
                <colgroup>
                    {headerGroup.headers.map((header) => <col
                        style={{
                            width: header.getSize(),
                        }}
                    />)}
                </colgroup>
            ))}
            <TableHeadStyled>
                {table.getHeaderGroups().map(headerGroup => (
                    <TableHeadRowStyled key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            if (header.isPlaceholder) return null;
                            const meta = header.column.columnDef.meta || {};
                            const { filterVariant } = meta;
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
                                    style={{
                                        ...getCellWidthStyle(header.getSize()),
                                    }}
                                    sx={{
                                        ...getCellWidthStyle(header.getSize()),
                                    }}
                                    filter={!filterVariant ? false : <TableHeadFilter header={header} />}
                                />
                            );
                        })}
                    </TableHeadRowStyled>
                ))}
            </TableHeadStyled>
        </>
    );
};