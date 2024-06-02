import { observer } from "mobx-react";
import { FC, ReactNode, useCallback, useLayoutEffect, useMemo } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import sessionManager from "@/api/SessionManager.ts";
import { Loader } from '@/components/Loader';
import { QUERY_REDIRECT, QUERY_TOKEN } from "@/constants/routes.ts";
import { useStores } from '@/hooks';

interface IAppRouteProps {
	children: ReactNode;
}

export const ProtectedRoute: FC<IAppRouteProps> = observer(({ children }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const redirect = useMemo(() => {
		return decodeURIComponent(searchParams.get(QUERY_REDIRECT) || '');
	}, [searchParams]);

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
		const token = decodeURIComponent(searchParams.get(QUERY_TOKEN) || sessionManager.token || '');
		sessionManager.setToken(token.trim());

		setSearchParams({});
		if(redirect) setSearchParams({ [QUERY_REDIRECT] : redirect });

		if(isAuthorized) return;
		await onAuthorize();
	}, [searchParams, setSearchParams, redirect, isAuthorized, onAuthorize]);

	useLayoutEffect(() => {
		onAuth();
	}, [onAuth]);

	if(!isLoadingAuth && redirect) {
		setSearchParams({});
		return <Navigate to={redirect} />;
	}

	if (!isAuthorized && !isLoadingAuth) {
		return <div>No auth data</div>;
	}

	return isLoadingAuth ? <Loader fullSize/> :  children;
});

export default ProtectedRoute;
