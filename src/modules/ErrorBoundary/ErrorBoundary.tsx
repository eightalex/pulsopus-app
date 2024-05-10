import Stack from '@mui/material/Stack';
import { memo, FC, useCallback } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

interface IErrorFallbackProps {
	error: Error;
	resetErrorBoundary: () => void;
}

export const ErrorFallback: FC<IErrorFallbackProps> = memo(({ error, resetErrorBoundary }) => {
	return (
		<div
			role="alert"
			style={{ overflow: 'auto' }}
		>
			<p>Oops!</p>
			<p>Something went wrong:</p>
			<pre style={{ color: 'red' }}>{error.message}</pre>
			<pre style={{ color: 'red' }}>{error.stack}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	);
});

const ErrorBoundary = () => {
	const onLogError = useCallback((error: Error, info: { componentStack: string }) => {
		// console.error('error', error);
		// console.warn('info', info);
	}, []);

	return (
		<ReactErrorBoundary
			FallbackComponent={ErrorFallback}
			onError={onLogError}
		>
			<Stack flexGrow={1}>
				<Outlet/>
			</Stack>
		</ReactErrorBoundary>
	);
};

export default memo(ErrorBoundary);
