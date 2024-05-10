import { IAutocompleteProps } from '@/components/Autocomplete/types';
import MuiAutocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FC, memo, useCallback } from 'react';
import { GroupHeaderStyled, GroupItemsStyled } from './styled';

const Autocomplete: FC<IAutocompleteProps> = ({ options, onChange, placeholder = '', renderGroupHeader, ...rest }) => {
	const handleChange = useCallback((e, option) => {
		onChange?.(option);
	}, [onChange]);

	if (!options || !options.length) {
		return;
	}
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
			options={options}
			renderInput={(params) =>
				<TextField
					{...params}
					placeholder={placeholder}
				/>
			}
			onChange={handleChange}
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
