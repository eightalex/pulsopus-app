import { Stack } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useCallback } from "react";

import { ButtonIcon } from "@/components/ButtonIcon";
import { PlusIcon } from "@/icons";

export const AdministrationActions = () => {
    const handleAdd = useCallback(() => {}, []);
    return (
        <Stack direction='row' spacing={2} justifyContent='space-between' width='100%'>
            <Stack direction='row' spacing={8} alignItems='center'>
                <Stack minWidth={350}>
                    <TextField
                        placeholder='Name'
                        variant="outlined"
                        fullWidth
                    />
                </Stack>
                <ButtonIcon
                    onClick={handleAdd}
                    disabled={false}
                    icon={<PlusIcon/>}
                    title="Add"
                />
            </Stack>
        </Stack>
    );
};