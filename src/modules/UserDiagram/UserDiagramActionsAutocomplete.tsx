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
			userDiagramStore: {
				user,
				setUser,
				compareAutocompleteOptions,
				isCompare,
				compareValue,
				setCompareValueByOption,
			},
		}
	} = useStores();

	const userAutocompleteValue = useMemo(() => {
		return usersAutocompleteOptions.find(({ value }) => value === user?.id) || null;
	}, [user, usersAutocompleteOptions]);

	const handleChangeUser = useCallback((option: IAutocompleteOption) => {
		if (!option) {
			setUser(null);
			return;
		}
		setUser(usersMap.get(option?.value as IUser['id']) || null);
	}, [usersMap, setUser]);

	return (
		<Stack spacing={4}>
			<Autocomplete
				placeholder="Name"
				value={userAutocompleteValue}
				options={usersAutocompleteOptions}
				onChange={handleChangeUser}
			/>
			<Collapse in={isCompare && !!user}>
				<Autocomplete
					placeholder="Employee or Department"
					value={usersAutocompleteOptions.find(({ value }) => value === user?.id) || null}
					options={usersAutocompleteOptions}
					onChange={handleChangeUser}
					// value={compareAutocompleteOptions.find(({ value }) => value === compareValue?.id) || null}}
					// options={compareAutocompleteOptions}
					// onChange={(option) => setCompareValueByOption(option)}
					// groupBy={(option) => option.type}
					// renderGroupHeader={({ group }) => group === 'user' ? <>employee</> : <>{group}</>}
				/>
			</Collapse>
		</Stack>
	);
});
