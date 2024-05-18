import { Stack } from '@mui/material';
import { observer } from 'mobx-react';

import { ButtonExport } from "@/components/ButtonExport";
import { ButtonIcon } from '@/components/ButtonIcon';
import CalendarRangePicker from '@/components/CalendarRangePicker';
import { useStores } from '@/hooks';
import { CompareIcon } from '@/icons';
import { UserDiagramActionsAutocomplete } from "@/modules/UserDiagram/UserDiagramActionsAutocomplete.tsx";

export const UserDiagramActions = observer(() => {
    const {
        rootStore: {
            userDiagramStore: {
                user,
                setCalendarRange,
                isCompare,
                onToggleCompare,
                calendarRange,
            },
        }
    } = useStores();

    return (
        <Stack direction='row' spacing={2} justifyContent='space-between' width='100%'>
            <Stack direction='row' spacing={8}>
                <Stack direction='row' spacing={4}>
                    <UserDiagramActionsAutocomplete/>
                    <CalendarRangePicker onChange={setCalendarRange} range={calendarRange}/>
                </Stack>
                <ButtonIcon
                    onClick={onToggleCompare}
                    disabled={!user}
                    icon={isCompare ? CompareIcon : CompareIcon}
                    title="Compare"
                />
            </Stack>
            <ButtonExport/>
        </Stack>
    );
});
