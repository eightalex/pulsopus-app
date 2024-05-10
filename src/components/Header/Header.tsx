import {NavLink} from '@/components/NavLink';
import {ABOUT_ROUTE, METHODOLOGY_ROUTE, ROOT_ROUTE, USER_CASES_ROUTE} from '@/constants/routes';
import {LogoIcon} from '@/icons';
import Stack from '@mui/material/Stack';
import {observer} from 'mobx-react';
import {FC} from 'react';
import {Link as ReactRouterLink} from 'react-router-dom';
import {Button} from "@mui/material";
import {useStores} from "@/hooks";

interface ILinkProps {
	to: string;
	label: string;
}

const Link: FC<ILinkProps> = ({ to, label }) => <NavLink
	to={to}
	label={label}
	textVariant="head1"
	textSize={16}
/>;

const Header = observer(() => {
	const { rootStore: { authStore: { isAuthorized, handleOpenAuth } } } = useStores();

	return (
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			sx={{padding: 9}}
		>
			<ReactRouterLink to={ROOT_ROUTE}>
				<LogoIcon sx={{width: 202, height: 28}}/>
			</ReactRouterLink>
			<Stack direction="row" spacing={24} alignItems="center">
				<Stack direction="row" spacing={12} display='none'>
					<Link
						to={ABOUT_ROUTE}
						label="About as"
					/>
					<Link
						to={METHODOLOGY_ROUTE}
						label="Methodology"
					/>
					<Link
						to={USER_CASES_ROUTE}
						label="User cases"
					/>
				</Stack>
				<Button
					onClick={handleOpenAuth}
					variant="text"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					{isAuthorized ? 'Get started' : 'Sign in'}
				</Button>
			</Stack>
		</Stack>
	);
});

export default Header;
