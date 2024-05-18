import Stack from '@mui/material/Stack';
import { FC, memo, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HexbinChart, { IInstancesParams } from '@/components/Chart/HexbinChart';
import { DIAGRAM_ROUTE } from '@/constants/routes';
import { useHexbinWidgetData } from '@/hooks';
import { IUser } from '@/interfaces';

import { HexbinWidgetLegend } from './HexbinWidgetLegend';
import { HexbinWidgetUserTooltip } from './HexbinWidgetUserTooltip';
import { HexbinWidgetZoomSlider } from './HexbinWidgetZoomSlider';

const scaleExpand = {
	min: 1,
	max: 2,
};

interface IHexbinWidgetProps {
	data: IUser[];
}

// TODO: create colors | data variables | add store data
const HexbinWidget: FC<IHexbinWidgetProps> = ({ data }) => {
	const navigate = useNavigate();
	const d = useHexbinWidgetData(data);
	const zoomParamsRef = useRef<IInstancesParams>();
	const [zoom, setZoom] = useState(1);

	const onZoom = useCallback((scale) => {
		if (!zoomParamsRef || !zoomParamsRef.current) return;
		const { svgInstance, zoomInstance } = zoomParamsRef.current;
		if (!zoomInstance || !svgInstance) return;
		// const svg = d3.select(svgRef.current);
		// const currentTransform = d3.zoomTransform(svg.node());
		setZoom(scale);
		svgInstance.transition().call(zoomInstance.scaleTo, scale);
	}, [zoomParamsRef]);

	const handleUserClick = useCallback(async (point) => {
		const id = point.id;
		if (!id) return;
		navigate(DIAGRAM_ROUTE, { state: { id }, relative: 'route' });
	}, [navigate]);

	return (
		<Stack spacing={2} width="100%">
			<Stack
				direction="row"
				spacing={4.5}
				justifyContent="space-between"
			>
				<Stack flexGrow={1}>
					<HexbinChart<IUser>
						matrix={d}
						scaleExtent={scaleExpand}
						getInstances={(param) => zoomParamsRef.current = param}
						onScaled={(scale) => setZoom(scale)}
						onClick={handleUserClick}
						renderTooltip={({ data }) => <HexbinWidgetUserTooltip user={data}/>}

					/>
				</Stack>
				<HexbinWidgetZoomSlider
					value={zoom}
					onChange={onZoom}
					scaleExpand={scaleExpand}
				/>
			</Stack>
			<HexbinWidgetLegend/>
		</Stack>
	);
};

export default memo(HexbinWidget);
