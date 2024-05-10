import { RangeDropdownStyled } from './styled';
import { useEventListener, useOnClickOutside } from '@/hooks';
import { Stack } from '@mui/material';
import { FC, RefObject, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ICalendarRangePickerDropdownProps } from './types';
import {CALENDAR_DROPDOWN_TOP_OFFSET} from "@/components/CalendarRangePicker/constants.ts";

export const CalendarRangePickerDropdown: FC<ICalendarRangePickerDropdownProps> = (props) => {
	const { children, onClose, targetRef} = props;
	const containerRef = useRef<HTMLDivElement>();

	const [position, setPosition] = useState({ top: 0, left: 0, right: 0, bottom: 0})

	useOnClickOutside<HTMLDivElement>(containerRef as RefObject<HTMLDivElement>, () => onClose?.());

	const calculatePosition = useCallback(() => {
		if(!targetRef || !targetRef.current || !containerRef || !containerRef.current) return;
		const r1 = targetRef.current.getBoundingClientRect()
		const r2 = containerRef.current.getBoundingClientRect();
		const pos = { top: r1.top + r1.height + CALENDAR_DROPDOWN_TOP_OFFSET, left: r1.left };
		if(pos.left + r2.width > window.innerWidth) {
			pos.left = r1.right - r2.width;
		}
		setPosition(pos);
	}, [targetRef, containerRef])

	useEventListener('scroll', calculatePosition, undefined, true);

	useEventListener('resize', calculatePosition, undefined, true);

	useLayoutEffect(() => {
		calculatePosition();
	}, [calculatePosition])

	return (
		<Stack
			ref={containerRef}
			sx={{
				width: 'auto',
				position: 'fixed',
				top: position.top,
				left: position.left,
				zIndex: 9999,
				marginTop: 2.5,
			}}
		>
			<RangeDropdownStyled>
			{children}
			</RangeDropdownStyled>
		</Stack>
	);
};
