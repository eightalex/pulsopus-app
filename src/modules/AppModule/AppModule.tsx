import ButtonIcon from '@/components/ButtonIcon';
import { AppLayout } from '@/components/Layout';
import { Loader } from '@/components/Loader';
import Typography from '@/components/Typography';
import { sideNavOptions } from '@/constants/navBar';
import { useStores } from '@/hooks';
import { ArrowLeftIcon } from '@/icons';
import { AppModuleAvatar } from '@/modules/AppModule/AppModuleAvatar';
import { ContainerStyled } from '@/modules/AppModule/styled';
import Stack from '@mui/material/Stack';
import { observer } from 'mobx-react';
import { memo, useEffect, useMemo } from 'react';
import { Location, Outlet, useLocation } from 'react-router-dom';

interface ILocationState {
	id: string;
}

const AppModule = observer(() => {
	const location: Location<ILocationState> = useLocation();
	const {
		rootStore: {
			routeStore: { goBack },
			usersStore: { getUsers, isLoadingUsers },
			departmentsStore: { getDepartments, isLoadingDepartments }
		}
	} = useStores();

	const userId = location?.state?.id;

	const pageLabel = useMemo(
		() => sideNavOptions.find(({ path }) => location?.pathname?.includes(path))?.label,
		[location]);

	const isLoading = isLoadingUsers || isLoadingDepartments;

	useEffect(() => {
		getUsers();
		getDepartments();
	}, [getUsers, getDepartments]);

	if (isLoading) {
		return <Loader fullSize/>;
	}

	return (
		<AppLayout>
			<ContainerStyled>
				<Stack
					spacing={8}
					flexGrow={1}
					height="100%"
				>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="flex-start"
						spacing={2}
					>
						<Stack
							direction="row"
							pt={5}
						>
							<Stack
								direction="row"
								spacing={2}
								alignItems="center"
							>
								{Boolean(userId) && (
									<ButtonIcon
										onClick={() => goBack()}
										title={'Back'}
										tooltipProps={{
											title: 'Back',
											placement: 'bottom',
										}}
										icon={<ArrowLeftIcon/>}
										sx={{
											border: 'none',
											outline: 'none',
											backgroundColor: 'transparent',
										}}
									/>
								)}
								<Typography variant="head1">
									{pageLabel?.toUpperCase()}
								</Typography>
							</Stack>
						</Stack>
						<AppModuleAvatar/>
					</Stack>
					<Stack
						flexGrow={1}
						height="100%"
					>
						<Outlet/>
					</Stack>
				</Stack>
			</ContainerStyled>
		</AppLayout>
	);
});

export default memo(AppModule);
