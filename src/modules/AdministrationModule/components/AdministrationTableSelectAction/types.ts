import { MouseEvent } from "react";

export interface IAdministrationTableSelectActionProps {
    isChecked?: boolean;
    isIndeterminate?: boolean;
    disabledSelect?: boolean;
    disabledDelete?: boolean;
    onDelete?: () => void;
    onSelect?: (e: MouseEvent) => void;
}