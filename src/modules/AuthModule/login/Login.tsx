import { observer } from 'mobx-react';
import {useStores} from "@/hooks";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@/components/Typography";
import {LoginForm} from "@/modules/AuthModule/login/LoginForm.tsx";
import Button from "@mui/material/Button";
import {GoogleIcon, MicrosoftIcon, TIcon} from '@/icons';
import {EAuthSignType} from "@/constants/EAuth.ts";

const authSignList: { icon: TIcon; type: EAuthSignType; }[] = [
    {icon: MicrosoftIcon, type: EAuthSignType.MICROSOFT},
    {icon: GoogleIcon, type: EAuthSignType.GOOGLE},
];

export const Login = observer(() => {
    const {
        rootStore: {
            authStore: {isLoadingAuth, onSign}
        },
    } = useStores();

    return (
        <Stack pt={2} spacing={8}>
            <Typography
                variant="body2"
                fontSize={20}
                textTransform="uppercase"
                textAlign='center'
            >
                Welcome
            </Typography>
            <Stack spacing={2}>
            {authSignList.map(({ type, icon: Icon }) => (
                <Button
                    disabled={isLoadingAuth}
                    key={type}
                    onClick={() => onSign(type)}
                    size='medium'
                    startIcon={<Icon />}
                    color='secondary'
                >
                    <Typography variant={'text'} color='inherit'>
                        {`Sing in with ${type}`}
                    </Typography>
                </Button>
            ))}
            </Stack>
            <Divider>or</Divider>
            <LoginForm/>
        </Stack>
    );
});