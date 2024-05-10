import {observer} from "mobx-react";
import Stack from "@mui/material/Stack";
import Typography from "@/components/Typography";
import {LoadingButton} from "@/components/LoadingButton";
import {LighthouseIcon} from '@/icons'
import {useStores} from "@/hooks";
import {useCallback} from "react";
import Button from "@mui/material/Button";

export const UnauthorizedSent = observer(() => {
    const {
        rootStore: {
            modalsStore: {
                userAuth: { onClose },
            },
            authStore: { resetAuthState },
        },
    } = useStores();

    const handleClose = useCallback(() => {
        onClose();
        resetAuthState();
    }, [onClose, resetAuthState])

    return (
        <Stack pt={2} spacing={8}>
            <Stack alignItems="center">
                <LighthouseIcon sx={{width: 90, height: 80}}/>
            </Stack>
            <Stack spacing={8.4}>
                <Typography
                    variant="text"
                    textTransform="uppercase"
                    textAlign='center'
                    color='success'
                >
                    successfully
                </Typography>
                <Typography variant="text" textAlign='center'>
                    desctiption ??
                </Typography>
            </Stack>
            <LoadingButton
                onClick={handleClose}
                variant={'contained'}
                size='medium'
            >
                <Typography
                    variant='text'
                    color='inherit'
                >
                    Confirm
                </Typography>
            </LoadingButton>
        </Stack>
    );
})