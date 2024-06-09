import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { FC, useCallback } from 'react';

import Typography from "@/components/Typography";
import {SelectStyled} from "./styled.tsx";
export interface ITableSelect {
    value?: string;
    onChange?: (value?: string) => void;
    options?: Array<string | number>;
}
export const TableSelect: FC<ITableSelect> = (props) => {
    const { value = '', onChange, options = [] } = props;
    const handleChange = useCallback((event: SelectChangeEvent) => {
        onChange?.(event.target.value);
    }, [onChange]);
    return (
        <SelectStyled
            value={value}
            onChange={handleChange}
            fullWidth
            // variant="filled"
            variant="outlined"
            renderValue={(value) => {
                if(!value) return <Typography>empty</Typography>;
                return <Typography>{value}</Typography>;
            }}
        >
            <MenuItem value=''>
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
        </Select>
    );
};