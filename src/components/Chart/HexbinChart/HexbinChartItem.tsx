import * as d3 from 'd3';
import { FC, MouseEvent,RefObject, useCallback, useMemo } from 'react';

import { HEX_CHART_STROKE_WIDTH_DEFAULT } from "@/constants/chart.ts";
import { createRoundedPathByString } from "@/helpers/createRoundedPathByCoords.ts";

interface ICord {
	x: number;
	y: number;
}

interface IHexbinChartItemProps {
	d: string;
	offset: ICord;
	position: ICord;
	fill?: string;
	url?: string;
	svg?: RefObject<SVGSVGElement>;
	groupId?: string;
	onMouseOver?: (e: MouseEvent<SVGPathElement>) => void;
	onMouseOut?: () => void;
	onClick?: () => void;
	hovering?: boolean;
}

export const HexbinChartItem: FC<IHexbinChartItemProps> = (props) => {
	const {
		d,
		offset,
		position,
		fill = '#1c1c1c',
		hovering = false,
		groupId = '',
		svg,
		onClick,
		onMouseOver,
		onMouseOut
	} = props;

	// TODO: optimize rounded hexbin path
	// const path = useMemo(() => createRoundedPathByString(d), [d])
	const path = d;

	const transformDefault = useMemo(() => `translate(${offset.x}, ${offset.y})`, [offset]);

	const handleClick = useCallback((e) => {
		e && e.preventDefault();
		e && e.stopPropagation();
		e && e.nativeEvent.stopImmediatePropagation();
		onClick?.();
	}, [onClick]);

	const handleMouseOver = useCallback((event: MouseEvent<SVGPathElement>) => {
		const { currentTarget } = event;
		if(!hovering) return;
		onMouseOver?.(event);
		svg?.current?.querySelectorAll('path').forEach(p => {
			const c = d3.hsl(p.getAttribute('data-fill-default'));
			c.s += -0.3;
			p.setAttribute('fill', c.toString());
		});
		const groupPaths = document.getElementById(groupId)?.querySelectorAll('path');
		groupPaths?.forEach(p => {
			const fillDefault: string = p.getAttribute('data-fill-default') || fill;
			const c = d3.hsl(fillDefault);
			c.s += -0.1;
			p.setAttribute('fill', c.toString());
		});
		const f = d3.hsl(fill);
		f.s += 0.3;
		currentTarget.setAttribute('fill', f.toString());
		currentTarget.setAttribute('opacity', '1');
	}, [hovering, onMouseOver, svg, groupId, fill]);

	const handleMouseOut = useCallback(() => {
		onMouseOut?.();
		if(!hovering) return;
		if(!svg || !svg.current) return;
		svg.current.querySelectorAll('path').forEach(p => {
			const fd: string = p.getAttribute('data-fill-default') || fill;
			p.setAttribute('fill', fd);
			p.style.transform = transformDefault;
		});
	}, [hovering, onMouseOut, svg, transformDefault, fill]);

	return (
		<path
			id={`${position.x}-${position.y}`}
			d={path}
			transform={transformDefault}
			stroke='#000'
			strokeWidth={HEX_CHART_STROKE_WIDTH_DEFAULT}
			strokeLinecap='round'
			strokeLinejoin="round"
			fill={fill}
			data-fill-default={fill}
			opacity={1}
			style={{
				cursor: hovering ? 'pointer' : 'unset',
				position: 'relative',
			}}
			onClick={handleClick}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onMouseDown={() => {
				hovering && onMouseOut?.();
			}}
		/>
	);
};
