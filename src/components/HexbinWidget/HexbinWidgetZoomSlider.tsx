import Slider, { SliderProps } from '@mui/material/Slider';
import { FC, KeyboardEvent,memo, useCallback, useMemo } from 'react';

interface IHexbinWidgetZoomSliderProps extends Omit<SliderProps, 'onChange' | 'value'> {
	onChange: (value: number) => void;
	value?: number;
	scaleExtent: {
		min: number,
		max: number
	};
}

export const HexbinWidgetZoomSlider: FC<IHexbinWidgetZoomSliderProps> = memo((props) => {
	const { onChange, value = 0, scaleExtent: { min = 1, max = 2 }, ...restProps } = props;

	const onKeyPreventNavigation = useCallback((e: KeyboardEvent) => {
		const activeKeys = ['ArrowUp', 'ArrowDown'];
		if (!activeKeys.includes(e.key)) {
			e.preventDefault();
		}
	}, []);

	const marks = [
		{ value: 0 },
		{ value: 100 },
	];

	const renderValue = useMemo(() => {
		if (value <= min) return 0;
		if (value >= max) return 100;
		const diff = max - min;
		const scaleV = value - min;
		return (scaleV / diff) * 100;
	}, [value, min, max]);

	// const handleChange = useCallback(({ target: { value } }: Event) => {
	const handleChange = useCallback((value: number) => {
		if (!value) {
			onChange(min);
			return;
		}
		const pV = (value / 100);
		const rangeV = max - min;
		const scaleValue = min + rangeV * pV;
		onChange(scaleValue);
	}, [onChange, min, max]);

	return (
		<Slider
			sx={{
				height: '100%',
			}}
			{...restProps}
			onChange={(_, value) => handleChange(value as number)}
			orientation="vertical"
			onKeyDown={onKeyPreventNavigation}
			min={0}
			max={100}
			step={1}
			marks={marks}
			value={renderValue}
		/>
	);
});
