import 'react-toastify/dist/ReactToastify.css';

import { useMemo } from 'react';
import { Bounce, ToastContainer, ToastContainerProps } from 'react-toastify';

import { AUTO_CLOSE_TIMEOUT } from '@/constants/toast.ts';
import { useWindowSize } from '@/hooks';

export const NotificationContainer = () => {
	const { breakpoints } = useWindowSize();

	const position = useMemo((): ToastContainerProps['position'] => {
		let position: ToastContainerProps['position'];
		switch (true) {
			case breakpoints.xs:
			case breakpoints.sm:
			case breakpoints.md:
				position = 'top-center';
				break;
			default:
				position = 'top-right';
		}
		return position;
	}, [breakpoints]);

	return (
		<ToastContainer
			position={position}
			autoClose={AUTO_CLOSE_TIMEOUT}
			hideProgressBar
			closeOnClick
			pauseOnHover
			draggable={false}
			theme={'dark'} // TODO: get from state
			transition={Bounce}
		/>
	);
};
