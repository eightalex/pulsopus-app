import { RefObject } from 'react';
import { useEventListener } from './useEventListener';

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: Handler,
	mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
	prevent?: boolean
): void {
	useEventListener(mouseEvent, event => {
		const el = ref?.current;
		if (!el || el.contains(event.target as Node)) {
			return;
		}
		if(prevent) {
			event && event.preventDefault();
			event && event.stopPropagation();
			event && event.stopImmediatePropagation();
		}
		handler(event);
	});
}
