import { Autocomplete, IAutocompleteOption } from '@/components/Autocomplete';
import { ButtonIcon } from '@/components/ButtonIcon';
import CalendarRangePicker from '@/components/CalendarRangePicker';
import { useStores } from '@/hooks';
import { CompareIcon, DownloadIcon } from '@/icons';
import { IUser } from '@/interfaces';
import { AppActionContainerStyled } from '@/modules/AppModule';
import { Stack } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { observer } from 'mobx-react';
import { useCallback } from 'react';

export const UserDiagramActions = observer(() => {
	const {
		rootStore: {
			usersStore: { usersOptions, usersMap },
			userDiagramStore: {
				user,
				setUser,
				setCalendarRange,
				compareOptions,
				isCompare,
				onToggleCompare,
				compareOption,
				setCompareValueByIdx,
				calendarRange,
			},
		}
	} = useStores();

	const handleChangeUser = useCallback((option: IAutocompleteOption) => {
		if (!option) {
			setUser(null);
			return;
		}
		setUser(usersMap.get(option?.id as IUser['id']) || null);
	}, [usersMap, setUser]);


	const handleExport = useCallback(() => {
		alert('Export as click');
	}, []);

	return (
		<AppActionContainerStyled sx={{ alignItems: 'flex-start' }}>
			<Stack
				spacing={8}
				direction="row"
				sx={{ paddingBottom: isCompare ? 4 : 0}}
			>
				<Stack
					spacing={6}
					direction="row"
				>
					<Stack spacing={4}>
						<Autocomplete
							placeholder="Name"
							value={usersOptions.find(({ id }) => id === user?.id) || null}
							options={usersOptions}
							onChange={handleChangeUser}
						/>
						<Collapse in={isCompare && !!user}>
							<Autocomplete
								placeholder="Employee or Department"
								value={compareOption}
								options={compareOptions}
								onChange={(option) => setCompareValueByIdx(option?.idx)}
								groupBy={(option) => option.type}
								renderGroupHeader={({ group }) => group === 'user' ? 'employee' : group}
							/>
						</Collapse>
					</Stack>
					<CalendarRangePicker onChange={setCalendarRange} range={calendarRange} />
					<ButtonIcon
						onClick={onToggleCompare}
						disabled={!user && !isCompare}
						icon={isCompare ? CompareIcon : CompareIcon}
						title="Compare"
					/>
				</Stack>
			</Stack>

			<ButtonIcon
				icon={DownloadIcon}
				onClick={handleExport}
				title="Export"
			/>
		</AppActionContainerStyled>
	);
});
