import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { observer } from "mobx-react";

import Typography from "@/components/Typography";
import { useStores } from "@/hooks";

export const ProtectedRouteNoAuth = observer(() => {
	const { rootStore: { authStore: { onRedirectLogin, isLoadingRedirectLogin } } } = useStores();

	return (
		<Stack
			justifyContent='center'
			alignItems='center'
			width='100%'
			flexGrow={1}
		>
			<Stack spacing={2}>
				<Typography variant="head1" sx={{ userSelect: 'none' }}>
					No auth data
				</Typography>
				<Button
					onClick={onRedirectLogin}
					disabled={isLoadingRedirectLogin}
				>
					Login
				</Button>
			</Stack>
		</Stack>
	);
});