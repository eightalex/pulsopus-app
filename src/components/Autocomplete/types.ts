import { AutocompleteRenderGroupParams } from '@mui/material/Autocomplete/Autocomplete';

export interface IAutocompleteOption {
	idx?: number;
	id?: string | number;
	type?: string;
	value: string;
	label: string;
}

export interface IAutocompleteProps {
	options: IAutocompleteOption[];
	onChange: (option: IAutocompleteOption) => void;
	placeholder?: string;
	renderGroupHeader?: (params: AutocompleteRenderGroupParams) => JSX.Element;
}
