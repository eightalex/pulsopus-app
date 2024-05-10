import { Loader } from '@/components/Loader';
import { Suspense } from 'react';

export const LazyLoader =
	(Component: React.LazyExoticComponent<any>, showLoader: boolean = true) =>
		(props: any): JSX.Element =>
			(
				<Suspense fallback={showLoader ? <Loader fullSize/> : null}>
					<Component {...props} />
				</Suspense>
			);
