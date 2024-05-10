import { animated, useSpring } from '@react-spring/web';
import { FC, useRef } from 'react';

// TODO: create constant for diagram colours
const lineColor = '#53DE99';
const areaColor = '#116C36';

interface IAreaChartItemProps {
	linePath: string;
	areaPath: string;
	color?: string;
}

export const AreaChartItem: FC<IAreaChartItemProps> = ({ linePath, areaPath, color = lineColor }) => {
	const id = useRef<number>(+Date.now());
	const props = useSpring({
		to: {
			linePath,
			areaPath,
			color,
		},
		config: {
			friction: 50,
		},
	});
	return (
		<>
			<defs>
				<linearGradient
					id={id.current}
					x1={0}
					y1={0}
					x2={0}
					y2={1}
				>
					<stop
						offset={0}
						stopColor={areaColor}
						stopOpacity={1}
					/>
					<stop
						offset={0.3}
						stopColor={areaColor}
						stopOpacity={0.7}
					/>
					<stop
						offset={0.7}
						stopColor={areaColor}
						stopOpacity={0.5}
					/>
					<stop
						offset={1}
						stopColor={'transparent'}
						stopOpacity={1}
					/>
				</linearGradient>
			</defs>
			<animated.path
				d={props.linePath}
				stroke={props.color}
				strokeWidth={1}
				opacity={1}
			/>
			<animated.path
				d={props.areaPath}
				opacity={1}
				stroke="none"
				fill={`url(#${id.current})`}
				fillOpacity={0.4}
			/>
		</>
	);
};
