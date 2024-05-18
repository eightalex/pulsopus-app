import { sortBy } from 'lodash';
import { IAutocompleteOption } from "@/components/Autocomplete";

interface IOptions<Item> {
    type?: string,
    comparator?: (item: Item) => IAutocompleteOption
    keys?: {
        label: string;
        value: string;
    }
}
export function generateAutocompleteOption<Item extends NonNullable<unknown>>(
    list: Item[],
    options: IOptions<Item> = {}
): IAutocompleteOption[] {
    const { type = '', comparator, keys } = options;
    if(!list) return [];
    let result: IAutocompleteOption[] = [];

    if(comparator && typeof comparator === 'function') {
        result = list.map(comparator);
    }

    if(keys) {
        result =  list.map((item: Item ) => {
            const result = {
                value: '',
                label: '',
            } as IAutocompleteOption;
            if(type) {
                result.type = type;
            }


            result.value = Object.prototype.hasOwnProperty.call(item, keys.value)
                // @ts-expect-error types error
                ? item[keys.value].toString()
                : `No value with key: ${keys.value}`;

            result.label = Object.prototype.hasOwnProperty.call(item, keys.label)
                // @ts-expect-error types error
                ? item[keys.label].toString()
                : `No label with key: ${keys.label}`;

            return result;
        });
    }

    return sortBy(result, ['type', 'label', 'value']);
}