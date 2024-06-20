import { Collapse } from '@mui/material';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import HexbinWidget from '@/components/HexbinWidget';
import { Loader } from "@/components/Loader";
import Typography from '@/components/Typography';
import { DIAGRAM_ROUTE } from '@/constants/routes';
import { useStores } from '@/hooks';
import { IUser } from "@/interfaces";
import { PeopleDynamicViewAbsoluteData } from '@/modules/PeopleDynamic/PeopleDynamicView/PeopleDynamicViewAbsoluteDate';
import { PeopleDynamicViewContent } from '@/modules/PeopleDynamic/PeopleDynamicView/PeopleDynamicViewContent';
import { PeopleDynamicViewInfo } from '@/modules/PeopleDynamic/PeopleDynamicView/PeopleDynamicViewInfo';

import { PeopleDynamicViewDiagramUserTooltip } from "./PeopleDynamicViewDiagramUserTooltip.tsx";

const tooltipTitleDefault = 'Your contribution graph and Achievements show activity from public repositories. You can choose to show activity from both public and private, with specific details of your activity in private repositories anonymized.  A viewer can only see information in the activity overview about repositories they have read access to. Get more information.';

interface IGetViewDataProps {
    title: string;
    difference: number;
    values: { value: number, label: string }[];
}

const getViewDataProps = (label, data): IGetViewDataProps => {
    if (!data) return {} as IGetViewDataProps;
    return {
        title: label,
        difference: data.diff,
        values: [
            { value: data.trend, label: 'Growth Trend' },
            { value: data.rate, label: 'Activity Rate' },
        ],
    };
};

export const PeopleDynamicViewDiagram = observer(() => {
    const {
        rootStore: {
            peopleDynamicStore: {
                department,
                showAbsoluteData,
                onToggleShowAbsoluteData,
                hexbinUsersData,
                departmentActivityData,
                absoluteActivityData,
            }
        }
    } = useStores();
    const scrollRef = useRef<HTMLDivElement>();

    const navigate = useNavigate();

    const departmentActivityViewDataProps = useMemo(() => getViewDataProps(department?.label, department && departmentActivityData), [department, departmentActivityData]);
    const absoluteActivityViewDataProps = useMemo(() => getViewDataProps('', department && absoluteActivityData), [department, absoluteActivityData]);

    const scrollToAbsolute = useCallback(() => {
        if (showAbsoluteData) {
            // TODO: create hook
            scrollRef?.current?.scrollIntoView({ behavior: 'smooth', inline: 'end' });
        }
    }, [showAbsoluteData]);

    const handleHexClick = useCallback(async (user: IUser) => {
        if(!user?.id) return;
        navigate(`/${DIAGRAM_ROUTE}`, { state: { id: user.id }, relative: 'route' });
    }, [navigate]);

    useEffect(() => {
        scrollToAbsolute();
    }, [scrollToAbsolute]);

    if(!department?.users?.length) {
        return (
            <span>No data to render</span>
        );
    }

    if (!hexbinUsersData?.length && Boolean(department?.users?.length)) return <Loader fullSize/>;

    return (
        <PeopleDynamicViewContent
            tooltipTitle={tooltipTitleDefault}
            content={
                <Stack>
                    <HexbinWidget<IUser>
                        data={hexbinUsersData}
                        onClick={handleHexClick}
                        renderTooltip={({ data, value }) => {
                            return <PeopleDynamicViewDiagramUserTooltip user={data} rate={value}/>;
                        }}
                    />
                    <Collapse
                        onEntered={scrollToAbsolute}
                        in={showAbsoluteData}
                        timeout={{ enter: 100, exit: 200 }}
                        easing='easy'
                    >
                        <PeopleDynamicViewAbsoluteData/>
                    </Collapse>
                    <div ref={scrollRef}/>
                </Stack>
            }
            side={(
                <Stack spacing={10}>
                    <Stack spacing={6}>
                        <PeopleDynamicViewInfo {...departmentActivityViewDataProps} />
                        <Stack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                <Typography
                                    variant="subtitle"
                                    textTransform="uppercase"
                                    color={absoluteActivityViewDataProps.difference > 0 ? 'success' : 'primary'}
                                >
                                    Absolute data
                                </Typography>
                                <Switch
                                    checked={showAbsoluteData}
                                    onChange={onToggleShowAbsoluteData}
                                    name="absolute.data.switch"
                                    sx={{
                                        transform: 'translateX(50%)'
                                    }}
                                />
                            </Stack>
                            <PeopleDynamicViewInfo {...absoluteActivityViewDataProps} />
                        </Stack>
                    </Stack>
                </Stack>
            )}
        />
    );
});
