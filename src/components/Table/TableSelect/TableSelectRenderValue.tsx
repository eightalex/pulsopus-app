import Collapse from '@mui/material/Collapse';
import Stack from "@mui/material/Stack";
import { FC, useMemo } from 'react';

import { replacedValue } from "@/components/Table/TableSelect/helpers.ts";
import Typography from "@/components/Typography";

import { ETableSelectType } from "./constants.ts";
import { ITableSelectRenderValueProps } from "./types.ts";

export const TableSelectRenderValue: FC<ITableSelectRenderValueProps> = (props) => {
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
            {replacedValue(value.toString())}
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
                    {replacedValue(value.toString())}
                </Typography>
            </Collapse>
        </Stack>
    );
};