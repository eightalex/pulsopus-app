import { ReactNode } from "react";
import { SelectProps } from "@mui/material/Select";
import { ETableSelectType } from "./constants.ts";

export interface ITableSelect extends Pick<SelectProps, 'renderValue'>{
    title?: string;
    value?: string | number;
    onChange?: (value?: string | number) => void;
    options?: Array<string | number>;
    type?: ETableSelectType;
    renderOption?: (value: ITableSelect['value'], index: number, values: ITableSelect['options']) => ReactNode
}

export interface ITableSelectRenderValueProps extends Pick<ITableSelect, 'title' | 'value' | 'type'> {}