import { useEventListener } from '@/hooks/useEventListener';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { RefObject, useState } from 'react';

export const useDimensions = (targetRef: RefObject<HTMLDivElement>) => {
	const getDimensions = () => {
		return {
			width: targetRef.current ? targetRef.current.offsetWidth : 0,
			height: targetRef.current ? targetRef.current.offsetHeight : 0
		};
	};

	const [dimensions, setDimensions] = useState(getDimensions);

	const handleResize = () => {
		const res = getDimensions();
		if (!res) return;
		setDimensions(res);
	};

	useEventListener('resize', handleResize);

	useIsomorphicLayoutEffect(() => {
		handleResize();
	}, []);

	return dimensions;
};
