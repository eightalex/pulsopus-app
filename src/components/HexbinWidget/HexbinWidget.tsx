import Stack from '@mui/material/Stack';
import { memo, useCallback, useRef, useState } from 'react';

import HexbinChart, { IInstancesParams } from '@/components/Chart/HexbinChart';
import { useHexbinWidgetData } from '@/hooks';

import { HexbinWidgetLegend } from './HexbinWidgetLegend';
import { HexbinWidgetZoomSlider } from './HexbinWidgetZoomSlider';
import { IHexbinWidgetProps } from './types.ts';

function HexbinWidget<TData>(props: IHexbinWidgetProps<TData>) {
	const {
		data,
		onClick,
		scaleMin = 1,
		scaleMax = 2,
		renderTooltip,
	} = props;
	const matrixData = useHexbinWidgetData<TData>(data);
	const zoomParamsRef = useRef<IInstancesParams>();
	const [zoom, setZoom] = useState(1);

	const onZoom = useCallback((scale: number) => {
		if (!zoomParamsRef || !zoomParamsRef.current) return;
		const { svgInstance, zoomInstance } = zoomParamsRef.current;
		if (!zoomInstance || !svgInstance) return;
		setZoom(scale);
		// @ts-expect-error param type error
		svgInstance.transition().call(zoomInstance.scaleTo, scale);
	}, [zoomParamsRef]);

	const handleHexClick = useCallback((data: TData) => {
		onClick?.(data);
	}, [onClick]);

	return (
		<Stack spacing={2} width="100%">
			<Stack
				direction="row"
				spacing={4.5}
				justifyContent="space-between"
			>
				<Stack flexGrow={1}>
					<HexbinChart<TData>
						matrix={matrixData}
						scaleExtent={{
							min: scaleMin,
							max: scaleMax
						}}
						getInstances={(param) => zoomParamsRef.current = param}
						onScaled={(scale) => setZoom(scale)}
						onClick={handleHexClick}
						renderTooltip={renderTooltip}

					/>
				</Stack>
				<HexbinWidgetZoomSlider
					value={zoom}
					onChange={onZoom}
					scaleExtent={{
						min: scaleMin,
						max: scaleMax
					}}
				/>
			</Stack>
			<HexbinWidgetLegend/>
		</Stack>
	);
}

export default memo(HexbinWidget);
