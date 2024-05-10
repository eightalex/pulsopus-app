import { MoonLightIcon, SunOutlinedIcon } from '@/icons';
import { Switch } from '@mui/material';
import Stack from '@mui/material/Stack';
import { memo, useCallback, useMemo, useState } from 'react';

const ThemeSwitch = () => {
	// TODO: implement theme store;
	const [isDark, setIsDark] = useState(true);

	const Icon = useMemo(() => isDark ? MoonLightIcon : SunOutlinedIcon, [isDark]);

	const handleChange = useCallback(() => {
		setIsDark((prev) => !prev);
	}, []);

	return (
		<Stack
			direction="row"
			spacing={3}
			alignItems='center'
		>
			<Icon/>
			<Switch
				disabled
				checked={isDark}
				onChange={handleChange}
				name="theme.switch"
			/>
		</Stack>
	);
};

export default memo(ThemeSwitch);
