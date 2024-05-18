import type { History } from "@remix-run/router";
import { observer } from "mobx-react";
import { memo } from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import { useStores } from "@/hooks";
import { NotificationContainer } from '@/modules/Root/NotificationContainer';
import { RootRoutes } from "@/modules/Root/RootRoutes.tsx";
import { RootWrapper } from "@/modules/Root/RootWrapper.tsx";
import Theme from '@/theme';

const BASELINE = '/';

const Root = observer(() => {
    const {
        rootStore: {
            routeStore: { history },
        },
    } = useStores();

    // return (
    //     <Provider store={store}>
    //         <Theme>
    //             <RootWrapper>
    //                 <RouterProvider router={router}/>
    //                 <NotificationContainer/>
    //             </RootWrapper>
    //         </Theme>
    //     </Provider>
    // );

    return (
        <HistoryRouter
            basename={BASELINE}
            history={history as unknown as History}
        >
            <Theme>
                <RootWrapper>
                    <NotificationContainer/>
                    <RootRoutes/>
                </RootWrapper>
            </Theme>
        </HistoryRouter>
    );
});


export default memo(Root);
