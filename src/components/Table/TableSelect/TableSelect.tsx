import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { FC, useCallback } from 'react';

import Typography from "@/components/Typography";

import { TableHeadSelectStyled } from "./styled.tsx";

export interface ITableSelect {
    title?: string;
    value?: string;
    onChange?: (value?: string) => void;
    options?: Array<string | number>;
}

export const RenderHeadValue = ({ value = '', title = '' }: { value?: string, title?: string }) => {
    const sxBase = {
        lineHeight: 1,
        textTransform: 'uppercase',
        fontSize: 10,
    };
    if (!value) return (
        <Typography textTransform='uppercase'>{title}</Typography>
    );

    return (
        <Stack spacing={0}>
            <Typography sx={sxBase}>{title}</Typography>
            <Typography
                sx={{
                    ...sxBase,
                    fontSize: 13,
                }}
            >
                {value}
            </Typography>
        </Stack>
    );
};
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
            renderValue={(renderValue) =>
                <RenderHeadValue
                    value={!value ? '' :renderValue as string}
                    title={title || ''}
                />
            }
        >
            <MenuItem disabled={!value} value=''>
                <em>All</em>
            </MenuItem>
            {options.map((value, index) => (
                <MenuItem
                    key={`${index}-${value}`}
                    value={value}
                >
                    <Typography
                        textTransform='uppercase'
                    >
                        {value}
                    </Typography>
                </MenuItem>
            ))}
        </TableHeadSelectStyled>
    );
};