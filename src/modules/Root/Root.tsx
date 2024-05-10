import {useStores} from '@/hooks';
import {NotificationContainer} from '@/modules/Root/NotificationContainer';
import Theme from '@/theme';
import {observer} from 'mobx-react';
import {FC, memo, ReactElement, useEffect} from 'react';
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import type {History} from "@remix-run/router";

interface IRoot {
    children: ReactElement;
}

const BASELINE = '/';

const Root: FC<IRoot> = observer(({children}) => {
    const {
        rootStore: {
            routeStore: {history},
            authStore: {onAuthorize},
        },
    } = useStores();

    useEffect(() => {
        onAuthorize();
    }, [onAuthorize]);

    return (
        <HistoryRouter
            basename={BASELINE}
            history={history as unknown as History}
        >
            <Theme>
                <NotificationContainer/>
                {children}
            </Theme>
        </HistoryRouter>
    );
});

export default memo(Root);
