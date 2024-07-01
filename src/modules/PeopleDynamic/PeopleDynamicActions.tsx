import Stack from '@mui/material/Stack';
import { observer } from 'mobx-react';
import moment from 'moment';
import { useCallback, useLayoutEffect, useMemo } from 'react';

import { Autocomplete, IAutocompleteOption } from '@/components/Autocomplete';
import ButtonIcon from '@/components/ButtonIcon';
import CalendarRangePicker from '@/components/CalendarRangePicker';
import { EPeopleDynamicView } from "@/constants/EPeopleDynamic.ts";
import { useStores } from '@/hooks';
import { DownloadIcon } from '@/icons';
import { AppActionContainerStyled } from '@/modules/AppModule';

import { viewButtonTitles, viewIcons } from "./constants.ts";

export const PeopleDynamicActions = observer(() => {
    const {
        rootStore: {
            departmentsStore: { departmentAutocompleteOptions, departmentsMap },
            peopleDynamicStore: {
                onToggleView,
                view,
                setCalendarRange,
                setDepartment,
                department,
                calendarRange,
                hexbinUsersData
            }
        }
    } = useStores();

    const disabledAutocomplete = useMemo(() => {
        return view === EPeopleDynamicView.TABLE;
    }, [view]);

    const departmentValue = useMemo(() => {
        if (!department) {
            return departmentAutocompleteOptions[0];
        }
        return departmentAutocompleteOptions
            .find(({ value }) => value === department?.id) || departmentAutocompleteOptions[0];
    }, [departmentAutocompleteOptions, department]);

    const handleChangeDepartment = useCallback((option?: IAutocompleteOption) => {
        if (!option) {
            return setDepartment(null);
        }
        const v = departmentsMap.get(option?.value) || null;
        return setDepartment(v);
    }, [setDepartment, departmentsMap]);

    const handleExport = useCallback(() => {
        const [f, t] = [
            moment(calendarRange.from).startOf('day'),
            moment(calendarRange.to).endOf('day'),
        ].map(m => m.format('ll'));
        const obj = {
            format: 'csv',
            f,
            from: moment(f).valueOf(),
            t,
            to: moment(t).valueOf(),
            department: department?.value,
            userIds: hexbinUsersData.map(({ data }) => data.id),
        };
        alert(JSON.stringify(obj, null, 2));
    }, [calendarRange, hexbinUsersData, department]);

    return (
        <AppActionContainerStyled>
            <Stack
                spacing={6}
                direction="row"
            >
                <Autocomplete
                    disabled={disabledAutocomplete}
                    placeholder="Department"
                    value={departmentValue}
                    options={departmentAutocompleteOptions}
                    onChange={handleChangeDepartment}
                />
                <CalendarRangePicker onChange={setCalendarRange} range={calendarRange}/>
            </Stack>

            <Stack
                spacing={4}
                direction="row"
            >
                <ButtonIcon
                    title={viewButtonTitles[view]}
                    icon={viewIcons[view]}
                    onClick={() => onToggleView()}
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
