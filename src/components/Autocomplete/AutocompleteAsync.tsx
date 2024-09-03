import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import { FC, Fragment, useEffect, useState } from 'react';

import { Autocomplete, IAutocompleteProps } from '@/components/Autocomplete';
import { Loader } from "@/components/Loader";
import Typography from "@/components/Typography";

export const AutocompleteAsync: FC<IAutocompleteProps> = (props) => {
	const {
		options = [],
		onChange,
		placeholder = '',
		value,
		loading: initialLoading = false,
		onOpen,
		onClose,
		...rest
	} = props;
	const [inputValue, setInputValue] = useState(value?.value || '');
	const [open, setOpen] = useState(false);
	const loading = (open && initialLoading) || (open && !options.length);

	useEffect(() => {
		return () => {
			onChange?.(undefined);
		};
	}, [onChange]);
	return (
		<Autocomplete
			open={open}
			onOpen={() => {
				setOpen(true);
				onOpen?.();
			}}
			onClose={() => {
				setOpen(false);
				onClose?.();
			}}
			value={value}
			options={options}
			placeholder={placeholder}
			loading={loading}
			autoComplete
			filterSelectedOptions
			// filterOptions={(x) => x}
			onInputChange={(_, newInputValue) => {
				setInputValue(newInputValue);
			}}
			loadingText={(
				<Stack direction='row' justifyContent='space-between'>
					<Typography>Loading...</Typography>
					<Loader size='small' fullSize={false}/>
				</Stack>
			)}
			noOptionsText={(
				<Typography>
					{inputValue ? "No options" : 'No input value'}
				</Typography>
			)}
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder={placeholder}
					fullWidth
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<Fragment>
								{loading && <Loader size='small'/>}
								{params.InputProps.endAdornment}
							</Fragment>
						),
					}}
				/>
			)}
			{...rest}
		/>
	);
};