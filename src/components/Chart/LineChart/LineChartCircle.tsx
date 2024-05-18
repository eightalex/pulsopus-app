import { animated, useSpring } from '@react-spring/web';
import { FC, SVGProps } from 'react';

import { CHART_POINT_RADIUS } from '@/constants/chart';

interface ILineChartCircleProps extends Omit<SVGProps<SVGCircleElement>, 'cx' | 'cy' | 'color'> {
	color: string;
	cx: number;
	cy: number;
}

export const LineChartCircle: FC<ILineChartCircleProps> = ({ color, cx, cy, ...rest }) => {
	// const circle = useSpring({
	// 	to: {
	// 		x: cx,
	// 		y: cy,
	// 	},
	// 	config: {
	// 		friction: 50,
	// 	},
	// });

	return (
		<circle
			cx={cx}
			cy={cy}
			r={CHART_POINT_RADIUS}
			stroke="#fff"
			fill={color}
			{...rest}
		/>
	// <animated.circle
	// 	cx={circle.x}
	// 	cy={circle.y}
	// 	r={CHART_POINT_RADIUS}
	// 	stroke="#fff"
	// 	fill={color}
	// 	{...rest}
	// />
)
	;
};
