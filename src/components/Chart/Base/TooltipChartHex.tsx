import { IInteractionData } from '@/components/Chart';
import Box from '@mui/material/Box';
import { FC, forwardRef, ReactNode, useRef } from 'react';

interface ITooltipChartProps {
	children?: ReactNode;
	interactionData?: IInteractionData<unknown>;
	r?: number;
}

const TooltipChartInner: FC<ITooltipChartProps> = ({ children, interactionData, r = 20 }) => {
	const { xPos, yPos } = interactionData;
	const ref = useRef<HTMLSpanElement>();

	return (
		<Box
			ref={ref}
			component="span"
			sx={({ spacing }) => ({
				minWidth: 186,
				position: 'absolute',
				top: 0,
				left: 0,
				transform: `translate(${xPos + 6}px, ${yPos}px)`,
				transition: 'transform .1s ease',
				padding: spacing(2, 4, 2.5, 4),
				borderRadius: 1,
				backgroundColor: '#373737',
				pointerEvents: 'none',
				'&::before': {
					content: '\'\'',
					position: 'absolute',
					top: r,
					left: 0,
					transform: 'translate(-100%, -50%)',
					width: 0,
					height: 0,
					borderTop: '6px solid transparent',
					borderBottom: '6px solid transparent',
					borderRight: '6px solid #343A3F',
				}
			})}
		>
			{children}
		</Box>
	);
};

export const TooltipChartHex = forwardRef((props: ITooltipChartProps, ref) => {
	const { children, ...restProps } = props;
	const { interactionData } = restProps;

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
				background: 'transparent',
				zIndex: 1,
			}}
		>
			{interactionData && <TooltipChartInner {...restProps} >{children}</TooltipChartInner>}
		</Box>
	);
});
