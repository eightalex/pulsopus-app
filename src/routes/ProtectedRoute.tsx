import { Loader } from '@/components/Loader';
import { EMPTY_USER_ROUTE } from '@/constants/routes';
import { useStores } from '@/hooks';
import { observer } from 'mobx-react';
import { FC, ReactNode, useLayoutEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IAppRouteProps {
	children: ReactNode;
}

const RootRedirectComponent = observer(() => {
	const location = useLocation();
	const {
		rootStore: {
			modalsStore: { userAuth: { onOpen } },
		},
	} = useStores();

	useLayoutEffect(() => {
		onOpen();
	}, [onOpen]);

	return <Navigate to={EMPTY_USER_ROUTE} state={{ from: location }} replace/>;
});

export const ProtectedRoute: FC<IAppRouteProps> = observer(({ children }) => {
	const {
		rootStore: {
			authStore: { isAuthorized, isLoadingAuth },
		},
	} = useStores();

	if (!isAuthorized && !isLoadingAuth) {
		return <RootRedirectComponent/>;
	}

	return isLoadingAuth ? <Loader fullSize/> :  children;
});

export default ProtectedRoute;
