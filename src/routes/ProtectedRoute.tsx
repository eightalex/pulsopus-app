import { observer } from "mobx-react";
import { FC, ReactNode, useCallback, useLayoutEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import sessionManager from "@/api/SessionManager.ts";
import { Loader } from '@/components/Loader';
import { useStores } from '@/hooks';

interface IAppRouteProps {
	children: ReactNode;
}

export const ProtectedRoute: FC<IAppRouteProps> = observer(({ children }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const {
		rootStore: {
			authStore: {
				isAuthorized,
				onAuthorize,
				isLoadingAuth
			}
		}
	} = useStores();

	const onAuth = useCallback(async () => {
		const token = decodeURIComponent(searchParams.get('token') || sessionManager.token || '');
		sessionManager.setToken(token.trim());
		setSearchParams({});
		if(isAuthorized) return;
		await onAuthorize();
	}, [searchParams, setSearchParams, isAuthorized, onAuthorize]);

	useLayoutEffect(() => {
		onAuth();
	}, [onAuth]);

	if (!isAuthorized && !isLoadingAuth) {
		return <div>No auth data</div>;
	}

	return isLoadingAuth ? <Loader fullSize/> :  children;
});

export default ProtectedRoute;
