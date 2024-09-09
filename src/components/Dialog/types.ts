import { ReactNode } from "react";
import { DialogProps as MUIDialogProps } from "@mui/material/Dialog/Dialog";

export interface IDialogProps extends Omit<MUIDialogProps, 'onClose' | 'title'> {
    onClose?: () => void;
    onConfirm?: () => void;
    title?: ReactNode;
    actions?: ReactNode;
    withDividers?: boolean;
    hideClose?: boolean;
}
