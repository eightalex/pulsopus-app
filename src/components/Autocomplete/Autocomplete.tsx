import MuiAutocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FC, memo, useCallback, useEffect, useMemo } from 'react';

import { IAutocompleteOption, IAutocompleteProps } from '@/components/Autocomplete/types';

import { GroupHeaderStyled, GroupItemsStyled } from './styled';

const Autocomplete: FC<IAutocompleteProps<object>> = (props) => {
	const {
		options = [],
		onChange,
		placeholder = '',
		renderGroupHeader,
		sortCompareOptions,
		...rest
	} = props;

	const sortedOptions = useMemo(() => {
		if(sortCompareOptions) {
			return options.sort(sortCompareOptions);
		}
		return options;
	}, [options, sortCompareOptions]);

	const handleChange = useCallback((option: IAutocompleteOption<object> | null) => {
		onChange?.(option || undefined);
	}, [onChange]);

	useEffect(() => {
		return () => {
			onChange?.(undefined);
		};
	}, [onChange]);

	return (
		<MuiAutocomplete
			sx={{
				width: 350
			}}
			disablePortal
			autoHighlight
			getOptionLabel={(option) => option?.label}
			getOptionKey={(option) => option?.value}
			isOptionEqualToValue={(opt, v) => opt.value === v.value}
			options={sortedOptions}
			renderInput={(params) =>
				<TextField
					{...params}
					placeholder={placeholder}
				/>
			}
			onChange={(_, value) => handleChange(value)}
			renderGroup={(params) => (
				<li key={params.key}>
					<GroupHeaderStyled>{renderGroupHeader ? renderGroupHeader(params) : params.group}</GroupHeaderStyled>
					<GroupItemsStyled>{params.children}</GroupItemsStyled>
				</li>
			)}
			fullWidth
			{...rest}
		/>
	);
};

export default memo(Autocomplete);
