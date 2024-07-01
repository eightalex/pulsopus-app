import Box from '@mui/material/Box';
import MUIDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';

import ButtonIcon from "@/components/ButtonIcon/ButtonIcon.tsx";
import { CloseIcon } from '@/icons';

import { IconWrapper } from './styled';
import { IDialogProps } from "./types.ts";

export const Dialog: FC<IDialogProps> = (props) => {
    const {
        onClose,
        title,
        children,
        withDividers = false,
        hideClose = false,
        actions,
        ...restProps
    } = props;
    return (
        <MUIDialog {...restProps} onClose={onClose}>
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
                    <Box sx={{ pl: 3, py: 3, pr: 8 }}>{title}</Box>
                )}
            </DialogTitle>
            <DialogContent dividers={withDividers}>{children}</DialogContent>
            {actions && <DialogActions>{actions}</DialogActions>}
        </MUIDialog>
    );
};
