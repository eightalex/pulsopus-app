import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { FC, useCallback } from 'react';

import { TableSelectRenderValue } from "@/components/Table/TableSelect/TableSelectRenderValue.tsx";
import { ITableSelect } from "@/components/Table/TableSelect/types.ts";
import Typography from "@/components/Typography";

import { ETableSelectType } from "./constants.ts";
import { TableHeadSelectStyled } from "./styled.tsx";

export const TableSelect: FC<ITableSelect> = (props) =>  {
    const {
        title,
        value = '',
        onChange,
        options = [],
        type = ETableSelectType.ROW,
        renderValue,
        renderOption,
    } = props;

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
            renderValue={(rValue) => {
                if (renderValue && typeof renderValue === 'function') {
                    return renderValue?.(rValue);
                }
                return (
                    <TableSelectRenderValue
                        value={!value ? '' : rValue as string}
                        title={title || ''}
                        type={type}
                    />
                );
            }}
            variant={type}
        >
            {type === ETableSelectType.HEAD && (
                <MenuItem disabled={!value} value=''>
                    <em>All</em>
                </MenuItem>
            )}
            {options.map((optV, index, opts) => (
                <MenuItem
                    disabled={value === optV}
                    key={`${index}-${optV}`}
                    value={optV}
                >
                    {(renderOption && typeof renderOption === 'function')
                        ? renderOption?.(optV, index, opts)
                        : (
                            <Typography
                                lineHeight={1}
                                textTransform='uppercase'
                            >
                                {optV}
                            </Typography>
                        )
                    }
                </MenuItem>
            ))}
        </TableHeadSelectStyled>
    );
};