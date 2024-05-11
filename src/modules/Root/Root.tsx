import { memo, StrictMode } from 'react';
import { Provider } from "react-redux";
import { RouterProvider } from 'react-router-dom';

import { NotificationContainer } from '@/modules/Root/NotificationContainer';
import { RootWrapper } from "@/modules/Root/RootWrapper.tsx";
import { router } from "@/routes";
import { store } from "@/stores";
import Theme from '@/theme';

const Root = () => {
    return (
        <StrictMode>
            <Provider store={store}>
            <Theme>
                <RootWrapper>
                    <RouterProvider router={router} />
                    <NotificationContainer/>
                </RootWrapper>
            </Theme>
            </Provider>
        </StrictMode>
    );
};

export default memo(Root);
