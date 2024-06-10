import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { flexRender } from "@tanstack/react-table";
import { FC, useCallback } from 'react';

import Typography from "@/components/Typography";

import { TableHeadSelectStyled } from "./styled.tsx";
export interface ITableSelect {
    title?: string;
    value?: string;
    onChange?: (value?: string) => void;
    options?: Array<string | number>;
}
export const TableSelect: FC<ITableSelect> = (props) => {
    const { title, value = '', onChange, options = [] } = props;

    const handleChange = useCallback((event: SelectChangeEvent<unknown>) => {
        const v = event?.target?.value as string;
        onChange?.(v);
    }, [onChange]);

    return (
        <TableHeadSelectStyled
            value={value}
            label={title}
            onChange={handleChange}
            inputProps={{
                value: value || title,
                placeholder: title,
            }}
            renderValue={(renderValue) => {
                const v = renderValue as string;
                if(!value) return (
                    <Typography textTransform='uppercase'>{title}</Typography>
                );
                return <span>Test {v}</span>;
            }}
        >
            <MenuItem disabled={!value} value=''>
                {/*<em>*/}
                {/*    {flexRender(*/}
                {/*        header.column.columnDef.header,*/}
                {/*        header.getContext()*/}
                {/*    )}*/}
                {/*</em>*/}
                <em>All</em>
            </MenuItem>
            {options.map(value => (
                <MenuItem value={value} key={value}>
                    {value}
                </MenuItem>
            ))}
        </TableHeadSelectStyled>
    );
};