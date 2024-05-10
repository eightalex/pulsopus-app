import { IChartBaseProps, IChartDataPoint, IInteractionData } from '@/components/Chart';
import { MARGIN_LEFT } from '@/constants/chart';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { animated, useSpring } from '@react-spring/web';
import { FC, forwardRef, ReactNode, useMemo, useRef } from 'react';

interface ITooltipChartProps {
	data?: IInteractionData<unknown>[];
	render: IChartBaseProps['renderTooltip'];
}

interface ITooltipChartProps extends IInteractionData<IChartDataPoint> {
	children?: ReactNode;
	render: IChartBaseProps['renderTooltip'];
	index: number;
	length: number;
}

const LEFT_OFFSET = 32 + MARGIN_LEFT;

const TooltipChartInner: FC<ITooltipChartProps> = (props) => {
	const { children, xPos, yPos, index, length } = props;
	const ref = useRef<HTMLSpanElement>();

	const top = useMemo(() => {
		if (length === 1) return yPos;
		return !index ? 0 : 'unset';
	}, [length, index, yPos]);

	const bottom = useMemo(() => {
		if (length === 1) return 'unset';
		return !index ? 'unset' : '-2px';
	}, [length, index]);

	const transform = useMemo(() => {
		const parentRect = ref.current?.parentElement?.getBoundingClientRect();
		const elementRect = ref.current?.getBoundingClientRect();
		const DEF_WIDTH = 400;
		let x = xPos <= DEF_WIDTH ? '0' : '-100%';

		if (!parentRect || !elementRect || length <= 1) return `translate(${x}, -50%)`;

		if(!index && xPos < elementRect.width - LEFT_OFFSET) x = '0';
		if(!index && xPos >= elementRect.width - LEFT_OFFSET) x = '-100%';

		if(index) x = '0';
		if(index && parentRect.width < xPos + elementRect.width) x = '-100%';

		return `translate(${x}, ${index ? '-50%' : '0'})`;
	}, [xPos, length, index]);

	const spring = useSpring({
		to: {
			top,
			bottom,
			left: xPos + MARGIN_LEFT,
		},
		config: {
			friction: 20,
		},
	});

	const AnimatedBox = animated(Box);
	return (
		<AnimatedBox
			ref={ref}
			component="span"
			style={spring}
			sx={({ spacing }) => ({
				position: 'absolute',
				transform,
				// transform: `translate(${!index ? -100 : 0}%, -50%)`,
				// transform: `translate(${tooltipShift}%, -50%)`,
				// transform: `translateX(${tooltipShift}%)`,
				padding: spacing(2, 4),
				borderRadius: 1,
				backgroundColor: '#373737',
				pointerEvents: 'none',
				userSelect: 'none',
				width: 'auto',
				// '&::before': {
				// 	content: '\'\'',
				// 	position: 'absolute',
				// 	top: CHART_TOOLTIP_POINT_RADIUS,
				// 	left: 0,
				// 	transform: 'translate(-100%, -50%)',
				// 	width: 0,
				// 	height: 0,
				// 	borderTop: '6px solid transparent',
				// 	borderBottom: '6px solid transparent',
				// 	borderRight: '6px solid #343A3F',
				// }
			})}
		>
			<Stack>
				{children}
			</Stack>
		</AnimatedBox>
	);
};

export const TooltipChartLine = forwardRef(({ data, render }: ITooltipChartProps, ref) => {
	return (
		<Box
			ref={ref}
			component="div"
			sx={{
				transform: 'translate(0px, 0px)',
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				pointerEvents: 'none',
				userSelect: 'none',
				background: 'transparent',
				zIndex: 1,
			}}
		>
			{Boolean(data?.length) && data?.map((data, index, arr) => (
				<TooltipChartInner
					key={index}
					length={arr.length}
					index={index}
					{...data}
				>
					{Boolean(data?.data) && render?.(data?.data as IChartDataPoint)}
				</TooltipChartInner>
			))}
		</Box>
	);
});
