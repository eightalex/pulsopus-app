import { observer } from "mobx-react";
import { FC, useCallback, useLayoutEffect, useMemo } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import sessionManager from "@/api/SessionManager.ts";
import { Loader } from '@/components/Loader';
import { QUERY_PARAM_LOGIN, QUERY_PARAM_TARGET, QUERY_PARAM_TOKEN } from "@/constants/routes.ts";
import { useStores } from '@/hooks';
import { ProtectedRouteNoAuth } from "@/routes/ProtectedRoute/ProtectedRouteNoAuth.tsx";
import Route, { IRouteProps } from "@/routes/Route.tsx";

interface IAppRouteProps extends IRouteProps {}

export const ProtectedRoute: FC<IAppRouteProps> = observer((props) => {
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

	const redirectTarget = useMemo(() => {
		return decodeURIComponent(searchParams.get(QUERY_PARAM_TARGET) || '');
	}, [searchParams]);

	const handleClearAuthSearchParams = useCallback(() => {
		let newUrl = location.pathname;
		if(location.search.length) {
			[QUERY_PARAM_LOGIN, QUERY_PARAM_TARGET, QUERY_PARAM_TOKEN].forEach((k) => {
				searchParams.has(k) && searchParams.delete(k);
			});
			const newParams = {} as Record<string, string>;
			for (const [key, value] of searchParams.entries()) {
				newParams[key] = value;
			}
			const query = new URLSearchParams(newParams).toString();
			if(query) {
				newUrl = newUrl.concat(`?${query}`);
			}
		}
		// window.history.replaceState for prevent re-render
		window.history.replaceState(window.history.state, '', newUrl);
	}, [searchParams]);

	const onAuth = useCallback(async () => {
		const token = decodeURIComponent(searchParams.get(QUERY_PARAM_TOKEN) || sessionManager.token || '');
		sessionManager.setToken(token.trim());

		if(redirectTarget) setSearchParams({ [QUERY_PARAM_TARGET] : redirectTarget });

		handleClearAuthSearchParams();
		if(isAuthorized) return;
		await onAuthorize(redirectTarget);
	}, [handleClearAuthSearchParams, searchParams, setSearchParams, redirectTarget, isAuthorized, onAuthorize]);

	useLayoutEffect(() => {
		onAuth();
	}, [onAuth]);

	if(isAuthorized && !isLoadingAuth && redirectTarget) {
		return <Navigate to={redirectTarget} />;
	}

	if (!isAuthorized && !isLoadingAuth) {
		return <ProtectedRouteNoAuth/>;
	}

	return isLoadingAuth ? <Loader fullSize/> :  <Route {...props} />;
});

export default ProtectedRoute;
