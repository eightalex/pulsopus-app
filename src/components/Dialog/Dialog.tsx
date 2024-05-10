import { FC } from 'react';
import MUIDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import {CloseIcon} from '@/icons';
import { IconWrapper } from './styled';
import {IDialogProps} from "./types.ts";
import ButtonIcon from "@/components/ButtonIcon/ButtonIcon.tsx";

export const Dialog: FC<IDialogProps> = ({ onClose, title, children, withDividers = false, hideClose = false, actions, ...props }) => {
    return (
        <MUIDialog {...props} onClose={onClose}>
            <DialogTitle component='div'>
                {!hideClose && (
                    <IconWrapper>
                        <ButtonIcon
                            disabledActive
                            onClick={onClose}
                            title={'Close'}
                            tooltipProps={{
                                title: 'Close',
                                placement: 'top',
                            }}
                            icon={<CloseIcon/>}
                        />
                    </IconWrapper>
                )}
                {title && (
                    <Box sx={{pl: 3, py: 3, pr: 8}}>{title}</Box>
                )}
            </DialogTitle>
            <DialogContent dividers={withDividers}>{children}</DialogContent>
            {actions && <DialogActions>{actions}</DialogActions>}
        </MUIDialog>
    );
};
