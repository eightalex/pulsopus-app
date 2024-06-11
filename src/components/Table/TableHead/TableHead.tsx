import { flexRender } from "@tanstack/react-table";

import { DEFAULT_COLUMN_SIZE, ETableFilterVariant } from "@/components/Table";
import { TableHeadFilter } from "@/components/Table/TableHead/TableHeadFilter/TableHeadFilter.tsx";

import { TableHeadRowStyled, TableHeadStyled } from "./styled.tsx";
import { TableHeadCell } from "./TableHeadCell";
import { ITableHeadProps } from "./types.ts";

const getCellWidthStyle = (size?: number): { width?: string; maxWidth?: string } => {
    if(!size || size === DEFAULT_COLUMN_SIZE) return {};
    return { width: `${size}px !important`, maxWidth: `${size}px !important` };
};

export function TableHead<Data>({ table, getRef }: ITableHeadProps<Data>) {
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
            <TableHeadStyled
                ref={(instance) => {
                    getRef?.(instance as HTMLDivElement);
                }}
            >
                {table.getHeaderGroups().map(headerGroup => (
                    <TableHeadRowStyled key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            if (header.isPlaceholder) return null;
                            const meta = header.column.columnDef.meta || {};
                            const { filterVariant } = meta as { filterVariant?: ETableFilterVariant };
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
                                    filter={!filterVariant ? false : <TableHeadFilter header={header} />}
                                />
                            );
                        })}
                    </TableHeadRowStyled>
                ))}
            </TableHeadStyled>
        </>
    );
}