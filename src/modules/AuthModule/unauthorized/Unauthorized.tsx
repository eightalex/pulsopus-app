import {observer} from "mobx-react";
import Stack from "@mui/material/Stack";
import Typography from "@/components/Typography";
import {TextField} from "@mui/material";
import {LoadingButton} from "@/components/LoadingButton";
import {useFormik} from "formik";
import {object} from "yup";
import {emailValidationSchema} from "@/constants/scheme/emailValidationSchema.ts";
import {useStores} from "@/hooks";
import {useMemo} from "react";
import {LighthouseIcon} from '@/icons'

const initialValues = {
    email: '',
};
export const Unauthorized = observer(() => {
    const {
        rootStore: {
            authStore: {isLoadingAuth, onSendAdmin},
        },
    } = useStores();

    const formik = useFormik({
        initialValues,
        validationSchema: object({email: emailValidationSchema}),
        onSubmit: (values) => {
            onSendAdmin(values.email);
        },
    });

    const isFormError = useMemo((): boolean => {
        const { email: touchedEmail } = formik.touched;
        const { email: errorEmail } = formik.errors;
        return Boolean((touchedEmail && errorEmail));
    }, [formik.errors, formik.touched]);

    return (
        <Stack pt={2} spacing={8}>
            <Stack alignItems="center">
                <LighthouseIcon sx={{ width: 90, height: 80}}/>
            </Stack>
            <Stack spacing={8.4}>
                <Typography
                    variant="text"
                    textTransform="uppercase"
                    textAlign='center'
                >
                    This email is not recognized as a registered user.
                </Typography>
                <Typography variant="text">
                    If you’re keen on kicking off with Pulsopus, just shoot a quick initiation request over to your admin. Easy as pie!
                </Typography>
            </Stack>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={4}>
                    <TextField
                        fullWidth
                        variant="filled"
                        placeholder="Enter SysAdmin email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                    />
                    <LoadingButton
                        loading={isLoadingAuth}
                        disabled={isFormError}
                        type="submit"
                        variant={'contained'}
                        size='medium'
                    >
                        <Typography variant='text' color='inherit'>
                            Sent Request
                        </Typography>
                    </LoadingButton>
                </Stack>
            </form>
        </Stack>
    );
})