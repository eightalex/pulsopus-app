import { observer } from "mobx-react";
import { FC, ReactNode, useCallback, useLayoutEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import sessionManager from "@/api/SessionManager.ts";
import { Loader } from '@/components/Loader';
import { useStores } from '@/hooks';

interface IAppRouteProps {
	children: ReactNode;
}

const outsideToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMmYwNDZkMy1mZGU0LTRhMWUtYWZlNi0xZmY5ZGVkNzJkM2MiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoiNDdkYzcxNjktNDE3OS00MzIyLWIzZWMtNzc5ZmRmYmM0ODJiIiwibmFtZSI6IkFETUlOIn1dLCJpYXQiOjE3MTU4NTE0NjgsImV4cCI6MTcxNTg1NTAwOH0.gm6znM0sj7PMwQaw29zuors7jtoU3p0kp-mmDzLIP80';

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
