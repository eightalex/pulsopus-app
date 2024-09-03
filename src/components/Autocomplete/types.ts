import { ReactNode } from "react";
import {
	AutocompleteProps,
	AutocompleteRenderGroupParams,
	AutocompleteRenderInputParams
} from '@mui/material/Autocomplete/Autocomplete';

export interface IAutocompleteOption {
	idx?: number;
	id?: string | number;
	type?: string;
	value: string;
	label: string;
}

export interface IAutocompleteProps extends Omit<AutocompleteProps<IAutocompleteOption, false, false, false>, 'onChange' | 'renderInput'> {
	renderInput?: (params: AutocompleteRenderInputParams) => ReactNode;
	value: IAutocompleteOption | null;
	options: IAutocompleteOption[];
	onChange?: (option?: IAutocompleteOption) => void;
	placeholder?: string;
	renderGroupHeader?: (params: AutocompleteRenderGroupParams) => JSX.Element;
	disabled?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
}