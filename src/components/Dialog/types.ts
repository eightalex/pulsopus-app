import {DialogProps as MUIDialogProps} from "@mui/material/Dialog/Dialog";
import {ReactNode} from "react";

export interface IDialogProps extends Omit<MUIDialogProps, 'onClose' | 'title'> {
    onClose?: () => void;
    title?: ReactNode;
    actions?: ReactNode;
    withDividers?: boolean;
    hideClose?: boolean;
}
