import { sortBy } from 'lodash';
import { IAutocompleteOption } from "@/components/Autocomplete";

interface IOptionsKeys<Item> {
    [k: string]: Omit<keyof Item, 'label' | 'value'>;
    label: string;
    value: string;
}

interface IOptions<Item> {
    type?: string,
    comparator?: (item: Item) => IAutocompleteOption<Item>
    keys?: IOptionsKeys<Item>;
}
export function generateAutocompleteOption<Item extends NonNullable<unknown>>(
    list: Item[],
    options: IOptions<Item> = {}
): IAutocompleteOption<Item>[] {
    const { type = '', comparator, keys } = options;
    if(!list) return [];
    let result: IAutocompleteOption<Item>[] = [];

    if(comparator && typeof comparator === 'function') {
        result = list.map(comparator);
    }

    if(keys && Object.keys(keys).length) {
        result =  list.map((item: Item ) => {
            const res = {
                value: '',
                label: '',
            } as IAutocompleteOption<Item>;
            if(type) {
                res.type = type;
            }

            const { value, label, ...restKeys } = keys;


            res.value = Object.prototype.hasOwnProperty.call(item, value)
                // @ts-expect-error types error
                ? item[value].toString()
                : `No value with key: ${value}`;

            res.label = Object.prototype.hasOwnProperty.call(item, label)
                // @ts-expect-error types error
                ? item[label].toString()
                : `No label with key: ${label}`;

            const rest = Object.entries(restKeys || {}).reduce((res, [k, v]) => {
                if(Object.prototype.hasOwnProperty.call(item, v)) {
                    res[k] = item[v];
                }
                return res;
            }, {} as Record<string, unknown>);

            return {
                ...res,
                ...rest
            };
        });
    }

    return sortBy(result, ['type', 'label', 'value']);
}