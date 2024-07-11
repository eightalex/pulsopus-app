import { observer } from "mobx-react";
import { FC, useCallback, useLayoutEffect, useMemo } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import sessionManager from "@/api/SessionManager.ts";
import { Loader } from '@/components/Loader';
import { IS_DEV } from "@/config";
import { QUERY_REDIRECT, QUERY_TOKEN } from "@/constants/routes.ts";
import { useStores } from '@/hooks';
import Route, { IRouteProps } from "@/routes/Route.tsx";

interface IAppRouteProps extends IRouteProps {}

const DEV_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjgxZmFmNzUyMWZmZDQxNTZiNjM4NGQiLCJ1c2VybmFtZSI6ImFkbWluIHRlc3QiLCJyb2xlIjoiQURNSU4iLCJzdGF0dXMiOiJBQ1RJVkUiLCJpc0FjdGl2ZSI6dHJ1ZSwiaWF0IjoxNzIwNTk3MTIwLCJleHAiOjE3MjA2MDA2NjB9.IEI-H2WHLcO_BjbXR0lrhyKL9DtWdVfOdAIVmTLVeow';

export const ProtectedRoute: FC<IAppRouteProps> = observer((props) => {
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
		// if(IS_DEV) {
		// 	token = DEV_TOKEN;
		// }
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

	return isLoadingAuth ? <Loader fullSize/> :  <Route {...props} />;
});

export default ProtectedRoute;
