import { Stack } from "@mui/material";
import TextField from '@mui/material/TextField';
import _debounce from 'lodash/debounce';
import { observer } from "mobx-react";
import { ChangeEvent, useCallback, useState } from "react";

import { ButtonIcon } from "@/components/ButtonIcon";
import { useStores } from "@/hooks";
import { PlusIcon } from "@/icons";

export const AdministrationActions = observer(() => {
    const {
        rootStore: {
            administrationStore: {
                setGlobalFilter,
                globalFilter
            }
        }
    } = useStores();
    const [filterValue, setFilterValue] = useState<string>(globalFilter);

    const handleDebounceFn = useCallback((v: string) => {
        setGlobalFilter(v);
    }, [setGlobalFilter]);

    const debounceFn = useCallback(_debounce(handleDebounceFn, 300), []);

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        debounceFn(v);
        setFilterValue(v);
    }, [debounceFn]);


    const handleAdd = useCallback(() => {}, []);
    return (
        <Stack direction='row' spacing={2} justifyContent='space-between' width='100%'>
            <Stack direction='row' spacing={8} alignItems='center'>
                <Stack minWidth={350}>
                    <TextField
                        onChange={handleInputChange}
                        value={filterValue}
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
});