import { DEFAULT_BLANK_KEY, DEFAULT_BLANK_VALUE } from "@/components/Table/TableSelect/constants.ts";

export const replacedValue = (v?: string | number) => {
    if(!v) return v;
    return v === DEFAULT_BLANK_KEY
        ? DEFAULT_BLANK_VALUE
        : v;
};