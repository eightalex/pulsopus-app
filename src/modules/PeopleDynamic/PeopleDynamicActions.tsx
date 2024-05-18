import Stack from '@mui/material/Stack';
import { observer } from 'mobx-react';
import { useCallback, useMemo } from 'react';

import { Autocomplete } from '@/components/Autocomplete';
import ButtonIcon from '@/components/ButtonIcon';
import CalendarRangePicker from '@/components/CalendarRangePicker';
import { EPeopleDynamicView } from '@/constants/EPeopleDynamic';
import { useStores } from '@/hooks';
import { DownloadIcon, ListIcon, PeopleOutlinedIcon } from '@/icons';
import { AppActionContainerStyled } from '@/modules/AppModule';

const viewIcons = {
	[EPeopleDynamicView.CHART]: ListIcon,
	[EPeopleDynamicView.TABLE]: PeopleOutlinedIcon,
};

const viewButtonTitles = {
	[EPeopleDynamicView.CHART]: 'Table view',
	[EPeopleDynamicView.TABLE]: 'Icons View',
};

export const PeopleDynamicActions = observer(() => {
	const {
		rootStore: {
			departmentsStore: { departmentAutocompleteOptions, departmentsMap },
			peopleDynamicStore: { onToggleView, view, setCalendarRange, setDepartment, department, calendarRange }
		}
	} = useStores();

	const departmentValue = useMemo(() => {
		if (!department) {
			return departmentAutocompleteOptions[0];
		}
		return departmentAutocompleteOptions.find(({ id }) => id === department?.id) || departmentAutocompleteOptions[0];
	}, [departmentAutocompleteOptions, department]);

	const handleChangeDepartment = useCallback((option) => {
		if (!option) {
			return setDepartment(null);
		}
		return setDepartment(departmentsMap.get(option?.id) || null);
	}, [setDepartment, departmentsMap]);

	const handleExport = useCallback(() => {
		alert('Export as click');
	}, []);

	return (
		<AppActionContainerStyled>
			<Stack
				spacing={6}
				direction="row"
			>
				<Autocomplete
					placeholder="Department"
					value={departmentValue}
					options={departmentAutocompleteOptions}
					onChange={handleChangeDepartment}
				/>
				<CalendarRangePicker onChange={setCalendarRange} range={calendarRange} />
			</Stack>

			<Stack
				spacing={4}
				direction="row"
			>
				<ButtonIcon
					title={viewButtonTitles[view]}
					icon={viewIcons[view]}
					onClick={onToggleView}
				/>
				<ButtonIcon
					icon={DownloadIcon}
					onClick={handleExport}
					title="Export"
				/>
			</Stack>
		</AppActionContainerStyled>
	);
});
