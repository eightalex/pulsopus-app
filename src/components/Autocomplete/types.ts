import { ReactNode } from "react";
import {
	AutocompleteProps,
	AutocompleteRenderGroupParams,
	AutocompleteRenderInputParams
} from '@mui/material/Autocomplete/Autocomplete';

export interface IAutocompleteOption<T> {
	id?: string | number;
	type?: string;
	value: string;
	label: string;
	groupBy?: string;
	[k: string]: Omit<keyof T, 'id' | 'type' | 'value' | 'label' | 'groupBy'> | undefined;
}

export interface IAutocompleteProps<Item extends object> extends Omit<AutocompleteProps<IAutocompleteOption<Item>, false, false, false>, 'onChange' | 'renderInput'> {
	renderInput?: (params: AutocompleteRenderInputParams) => ReactNode;
	value: IAutocompleteOption<Item> | null;
	options: IAutocompleteOption<Item>[];
	onChange?: (option?: IAutocompleteOption<Item>) => void;
	placeholder?: string;
	renderGroupHeader?: (params: AutocompleteRenderGroupParams) => JSX.Element;
	disabled?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
	sortCompareOptions?: (a: IAutocompleteOption<Item>, b: IAutocompleteOption<Item>) => number;
}