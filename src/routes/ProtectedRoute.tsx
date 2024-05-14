import { FC, ReactNode, useCallback, useLayoutEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import sessionManager from "@/api/SessionManager.ts";
import { Loader } from '@/components/Loader';
import { useDispatch, useSelector } from '@/hooks';
import { onAuthorize, selectAuthIsAuthorized, selectAuthIsLoading } from "@/stores/auth";

interface IAppRouteProps {
	children: ReactNode;
}

export const ProtectedRoute: FC<IAppRouteProps> = ({ children }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch();
	const isAuthorized = useSelector(selectAuthIsAuthorized);
	const isLoadingAuth = useSelector(selectAuthIsLoading);

	const onAuth = useCallback(() => {
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMiIsInVzZXJuYW1lIjoiYWRtaW5AcHVsc29wdXMuZGV2Iiwicm9sZXMiOlt7Im5hbWUiOiJBRE1JTiJ9XSwiaWF0IjoxNzE1NzAzNjI2LCJleHAiOjE3MTU3MDcxNjZ9.E8TkcxOKudpOT7c2HMwnB8bLYz0nLc40dLHhACtu1_Q';
		// const token = decodeURIComponent(searchParams.get('token') || sessionManager.token || '');
		sessionManager.setToken(token.trim());
		setSearchParams({});
		if(isAuthorized) return;
		dispatch(onAuthorize());
	}, [searchParams, setSearchParams, isAuthorized, dispatch]);

	useLayoutEffect(() => {
		onAuth();
	}, [onAuth]);

	if (!isAuthorized && !isLoadingAuth) {
		return <div>No auth data</div>;
	}

	return isLoadingAuth ? <Loader fullSize/> :  children;
};

export default ProtectedRoute;
