import { motion } from "framer-motion";
import { FC } from 'react';
import {createRoundedPathByString} from "@/helpers/createRoundedPathByCoords.ts";

interface ILineChartItemProps {
	path: string;
	color?: string;
	fill?: string;
}

export const LineChartItem: FC<ILineChartItemProps> = ({ path, color, fill = 'none' }) => {
	return (
		<motion.path
			initial={{ pathLength: 0, d: path }}
			animate={{ pathLength: 1, d: path }}
			transition={{ duration: 2, type: 'spring' }}
			fill={fill}
			stroke={color}
			strokeWidth={1}
			opacity={1}
		/>
	);
};
