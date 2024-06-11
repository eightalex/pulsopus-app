import Stack from "@mui/material/Stack";
import { FC } from "react";

import { ITablePaginationButtonProps, tablePaginationButtonByType } from "@/components/Table";
import Typography from "@/components/Typography";

export const TablePaginationButtonEllipsis: FC<ITablePaginationButtonProps> = (props) => {
    const { type } = props;

    return (
        <Stack
            sx={({ spacing }) => ({
                color: '#D0D0D0',
                padding: spacing(2),
                cursor: 'default',
                userSelect: 'none',
            })}
        >
            <Typography
                color='inherit'
                textAlign='center'
                variant='body1'
                letterSpacing='-3.5px'
            >
                {tablePaginationButtonByType[type]}
            </Typography>
        </Stack>
    );
};