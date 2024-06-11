import Collapse from '@mui/material/Collapse';
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { FC, useCallback, useMemo } from 'react';

import Typography from "@/components/Typography";

import { TableHeadSelectStyled } from "./styled.tsx";

export const enum ETableSelectType {
    HEAD = 'HEAD',
    ROW = 'ROW',
}

export interface ITableSelect {
    title?: string;
    value?: string;
    onChange?: (value?: string) => void;
    options?: Array<string | number>;
    type?: ETableSelectType;
}

export interface IRenderHeadValueProps {
    value?: string;
    title?: string;
    type?: ITableSelect['type'];
}

export const RenderHeadValue: FC<IRenderHeadValueProps> = (props) => {
    const { value = '', title = '', type } = props;
    const sxBase = useMemo(() => ({
        lineHeight: 1,
        textTransform: 'uppercase',
        fontSize: 10,
        transition: 'all .25s ease',
    }), []);

    const titleRender = useMemo(() => {
        let titleSx = {
            ...sxBase,
            fontSize: 16,
        };
        if(value) {
            titleSx = {
                ...titleSx,
                fontSize: 10,
            };
        }
        return <Typography sx={titleSx} >{title}</Typography>;
    }, [sxBase, title, value]);

    if(type === ETableSelectType.ROW) {
        return <Typography
            sx={{
                ...sxBase,
                fontSize: 16,
                color: 'inherit'
        }}
        >
            {value}
        </Typography>;
    }

    return (
        <Stack spacing='2px' justifyContent='center'>
            {titleRender}
            <Collapse in={Boolean(value)}>
                <Typography
                    sx={{
                        ...sxBase,
                        fontSize: 13,
                    }}
                >
                    {value}
                </Typography>
            </Collapse>
        </Stack>
    );
};
export const TableSelect: FC<ITableSelect> = (props) => {
    const {
        title,
        value = '',
        onChange,
        options = [],
        type = ETableSelectType.ROW,
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
            renderValue={(renderValue) =>
                <RenderHeadValue
                    value={!value ? '' :renderValue as string}
                    title={title || ''}
                    type={type}
                />
            }
            variant={type}
        >
            {type === ETableSelectType.HEAD && (
                <MenuItem disabled={!value} value=''>
                    <em>All</em>
                </MenuItem>
            )}
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