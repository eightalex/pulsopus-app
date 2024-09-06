import { Stack } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { observer } from 'mobx-react';
import { useCallback, useMemo } from 'react';

import { Autocomplete, IAutocompleteOption } from '@/components/Autocomplete';
import { useStores } from '@/hooks';
import { IUser } from '@/interfaces';

export const UserDiagramActionsAutocomplete = observer(() => {
	const {
		rootStore: {
			usersStore: { usersAutocompleteOptions, usersMap },
			departmentsStore: { departmentsMap },
			userDiagramStore: {
				user,
				setUser,
				compareAutocompleteOptions,
				isCompare,
				compareValue,
				setCompareValue,
			},
		}
	} = useStores();

	const userAutocompleteValue = useMemo(() => {
		return usersAutocompleteOptions.find(({ value }) => value === user?.id) || null;
	}, [user, usersAutocompleteOptions]);

	const compareAutocompleteValue = useMemo(() => {
		return compareAutocompleteOptions.find(({ value }) => value === compareValue?.id) || null;
	}, [compareValue, compareAutocompleteOptions]);

	const handleChangeUser = useCallback((option?: IAutocompleteOption) => {
		if (!option) {
			setUser(null);
			return;
		}
		setUser(usersMap.get(option?.value as IUser['id']) || null);
	}, [usersMap, setUser]);

	const handleChangeCompareValue = useCallback((option?: IAutocompleteOption) => {
		if (!option) {
			setCompareValue(null);
			return;
		}
		const fnd = option?.type === 'user' ? usersMap : departmentsMap;
		setCompareValue(fnd.get(option?.value || '') || null);
	}, [setCompareValue, usersMap, departmentsMap]);

	return (
		<Stack spacing={4}>
			<Autocomplete
				placeholder="Name"
				value={userAutocompleteValue}
				options={usersAutocompleteOptions}
				onChange={handleChangeUser}
				groupBy={(option) => option?.department || ''}
				sortCompareOptions={(a, b) => String(a.department || '').localeCompare(String(b.department || ''))}
			/>
			<Collapse in={isCompare && !!user}>
				<Autocomplete
					placeholder="Employee or Department"
					value={compareAutocompleteValue}
					options={compareAutocompleteOptions}
					// onChange={(option) => setCompareValueByOption(option)}
					onChange={handleChangeCompareValue}
					groupBy={(option) => option?.type || ''}
					renderGroupHeader={({ group }) => group === 'user' ? <>employee</> : <>{group}</>}
				/>
			</Collapse>
		</Stack>
	);
});
