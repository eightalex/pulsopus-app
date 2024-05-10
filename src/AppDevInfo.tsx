import Typography from '@/components/Typography';
import { APP_VERSION } from '@/config';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import ButtonIcon from "@/components/ButtonIcon/ButtonIcon.tsx";
import { CloseIcon, TrashIcon } from "@/icons";
import { LocalService } from "@/api/services";

const PopUp = () => {
    const [users, setUsers] = useState(new LocalService().getLocalUsers());
    const onDelete = (login: string) => {
        const newUsers = users.filter(([l]) => l !== login);
        setUsers(newUsers);
        new LocalService().setLocalUsers(newUsers);
    };
    return (
        <Stack p={2}>
            <Typography
                variant="text"
            >
                Users
            </Typography>
            <Stack>
                {users.map(([l, p], index) => (
                    <Stack direction='row' key={`${l}:${p}`} spacing={1} alignItems='center'>
                        <Typography variant="text">{l}</Typography>
                        <Typography variant="text">&#58;</Typography>
                        <Typography variant="text">{p}</Typography>
                        {Boolean(index) && (
                            <ButtonIcon
                                disabledActive
                                onClick={() => onDelete(l)}
                                title={'Close'}
                                tooltipProps={{
                                    title: 'Close',
                                    placement: 'top',
                                }}
                                icon={TrashIcon}
                            />
                        )}
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
};

export const AppDevInfo = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Stack
                onClick={() => setOpen(true)}
                spacing={0}
                direction='row'
                sx={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    color: '#D0D0D0',
                    padding: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="text"
                    color='inherit'
                    fontSize={12}
                >
                    dev v{APP_VERSION}
                </Typography>
            </Stack>
            {open && (
                <Stack
                    sx={{
                        position: 'fixed',
                        left: 0,
                        bottom: 0,
                        padding: 2,
                        backgroundColor: '#05132a',
                    }}
                    direction='row'
                >
                    <PopUp/>
                    <ButtonIcon
                        disabledActive
                        onClick={() => setOpen(false)}
                        title={'Close'}
                        tooltipProps={{
                            title: 'Close',
                            placement: 'top',
                        }}
                        icon={<CloseIcon/>}
                    />
                </Stack>
            )}
        </>
    );

};
