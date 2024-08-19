import { Stack } from '@mui/material';
import { FC, RefObject, useCallback, useLayoutEffect, useRef, useState } from 'react';

import { CALENDAR_DROPDOWN_TOP_OFFSET } from "@/components/CalendarRangePicker/constants.ts";
import { useEventListener, useOnClickOutside } from '@/hooks';

import { ICalendarRangePickerDropdownProps } from '../types.ts';
import { CalendarRangePickerDropdownInner } from "./styled.tsx";

export const CalendarRangePickerDropdown: FC<ICalendarRangePickerDropdownProps> = (props) => {
	const { children, onClose, targetRef } = props;
	const wrapperRef = useRef<HTMLDivElement>();

	const [position, setPosition] = useState({ top: 0, left: 0 });

	useOnClickOutside<HTMLDivElement>(wrapperRef as RefObject<HTMLDivElement>, (e) => onClose?.(e));

	const calculatePosition = useCallback(() => {
		if(!targetRef || !targetRef.current || !wrapperRef || !wrapperRef.current) return;
		const r1 = targetRef.current.getBoundingClientRect();
		const r2 = wrapperRef.current.getBoundingClientRect();
		const pos = { top: r1.top + r1.height + CALENDAR_DROPDOWN_TOP_OFFSET, left: r1.left };
		if(pos.left + r2.width > window.innerWidth) {
			pos.left = r1.right - r2.width;
		}
		setPosition(pos);
	}, [targetRef, wrapperRef]);

	useEventListener('scroll', calculatePosition, undefined, true);

	useEventListener('resize', calculatePosition, undefined, true);

	useLayoutEffect(() => {
		calculatePosition();
	}, [calculatePosition]);

	return (
		<Stack
			ref={wrapperRef as  RefObject<HTMLDivElement>}
			sx={{
				width: 'auto',
				position: 'fixed',
				top: position.top,
				left: position.left,
				zIndex: 9999,
				marginTop: 2.5,
			}}
		>
			<CalendarRangePickerDropdownInner>
				{children}
			</CalendarRangePickerDropdownInner>
		</Stack>
	);
};
