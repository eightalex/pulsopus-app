import Stack from "@mui/material/Stack";
import { observer } from "mobx-react";

import { AdministrationTable } from "./AdministrationTable.tsx";

export const AdministrationContent = observer(() => {
    return (
        <Stack
            sx={{
                width: '100%',
            }}
        >
            <AdministrationTable/>
        </Stack>
    );
});