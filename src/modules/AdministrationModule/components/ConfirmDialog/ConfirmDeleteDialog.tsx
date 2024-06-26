import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FC, useCallback, useMemo } from "react";

import { Dialog, IDialogProps } from "@/components/Dialog";
import Typography from "@/components/Typography";
import { IUser } from "@/interfaces";

interface IConfirmDeleteDialogProps extends Partial<IDialogProps> {
    usersToDelete?: IUser[];
}

export const ConfirmDeleteDialog: FC<IConfirmDeleteDialogProps> = (props) => {
    const {
        onClose,
        usersToDelete = [],
        ...restProps
    } = props;

    const dialogHeadTitle = useMemo(() => {
        if(!usersToDelete.length) return '';
        if(usersToDelete.length === 1) {
            const username = usersToDelete[0].username;
            return `A u sure u want to delete ${username}?`;
        }
        return `A u sure u want to delete ${usersToDelete.length} users?`;
    },  [usersToDelete]);

    const handleDelete = useCallback(() => {
        const rowsIds = usersToDelete.map((u) => u.id);
        alert(JSON.stringify(rowsIds, null, 2));
        console.log('usersToDelete', usersToDelete);
        onClose?.();
    }, [onClose, usersToDelete]);

    return (
        <Dialog
            open={Boolean(usersToDelete.length)}
            onClose={onClose}
            title='Confirm delete'
            maxWidth='lg'
            sx={{
                position: 'fixed',
                zIndex: 2,
            }}
            actions={[
                <Stack
                    key='dialog-actions'
                    direction='row'
                    spacing={4}
                    sx={({ spacing }) => ({
                        padding: spacing(4, 6)
                    })}
                >
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        color='error'
                        variant='contained'
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Stack>
            ]}
            {...restProps}
        >
            <Stack spacing={1}>
                <Typography variant='title'>{dialogHeadTitle}</Typography>
                <Stack spacing={0}>
                    {Boolean(usersToDelete.length) && usersToDelete.length > 1 && (
                        <>
                            {usersToDelete.map(({ username }, index) => (
                                <Stack
                                    key={username}
                                    direction='row'
                                    spacing={2}
                                    flexGrow={1}
                                    width='100%'
                                >
                                    <Stack justifyContent='flex-end' direction='row' width={24}>
                                        <Typography variant='body2'>
                                            {index + 1}.
                                        </Typography>
                                    </Stack>
                                    <Stack flexGrow={1} direction='row' sapcing={2} width='100%'>
                                        <Typography variant='body2'>
                                            {username}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            ))}
                        </>
                    )}
                </Stack>
            </Stack>
        </Dialog>
    );
};