import Stack from "@mui/material/Stack";
import type { History } from "@remix-run/router";
import { observer } from "mobx-react";
import { memo } from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import Typography from "@/components/Typography";
import { APP_VERSION,IS_DEV } from "@/config";
import { useStores } from "@/hooks";
import { NotificationContainer } from '@/modules/Root/NotificationContainer';
import { RootRoutes } from "@/modules/Root/RootRoutes.tsx";
import { RootWrapper } from "@/modules/Root/RootWrapper.tsx";
import Theme from '@/theme';

const BASELINE = '/';

const BuildVersion = () => {
    if(!IS_DEV) {
        return;
    }
    return (
        <Stack
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
            }}
        >
            <Typography variant="caption1">v{APP_VERSION}</Typography>
        </Stack>
    );
};

const Root = observer(() => {
    const {
        rootStore: {
            routeStore: { history },
        },
    } = useStores();

    return (
        <HistoryRouter
            basename={BASELINE}
            history={history as unknown as History}
        >
            <Theme>
                <RootWrapper>
                    <NotificationContainer/>
                    <RootRoutes/>
                    <BuildVersion/>
                </RootWrapper>
            </Theme>
        </HistoryRouter>
    );
});


export default memo(Root);
