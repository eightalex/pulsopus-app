import { ButtonProps } from "@mui/material/Button";
import { ETablePaginationButtonType } from "./constants";

export interface ITablePaginationButtonProps extends Omit<ButtonProps, 'type'> {
    type?: ETablePaginationButtonType,
    selected?: boolean;
}