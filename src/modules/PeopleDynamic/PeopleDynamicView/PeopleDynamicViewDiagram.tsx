import { Collapse } from '@mui/material';
import Stack from '@mui/material/Stack';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import HexbinWidget from '@/components/HexbinWidget';
import { Loader } from "@/components/Loader";
import { DIAGRAM_ROUTE } from '@/constants/routes';
import { useStores } from '@/hooks';
import { IUser } from "@/interfaces";
import { PeopleDynamicViewAbsoluteData } from '@/modules/PeopleDynamic/PeopleDynamicView/PeopleDynamicViewAbsoluteDate';
import { PeopleDynamicViewContent } from '@/modules/PeopleDynamic/PeopleDynamicView/PeopleDynamicViewContent';

import { PeopleDynamicViewDiagramUserTooltip } from "./PeopleDynamicViewDiagramUserTooltip.tsx";
import { PeopleDynamicViewRateTrend } from "./PeopleDynamicViewRateTrend.tsx";

const tooltipTitleDefault = 'Your contribution graph and Achievements show activity from public repositories. You can choose to show activity from both public and private, with specific details of your activity in private repositories anonymized.  A viewer can only see information in the activity overview about repositories they have read access to. Get more information.';

const renderUserTooltip = ({ data, value }) => <PeopleDynamicViewDiagramUserTooltip user={data} rate={value}/>;

export const PeopleDynamicViewDiagram = observer(() => {
    const {
      rootStore: {
        peopleDynamicStore: {
          department,
          showAbsoluteData,
          hexbinUsersData,
          calendarRange,
        },
        userDiagramStore: {
          setCalendarRange: setUserDiagramCalendarRange,
        },
      }
    } = useStores();

    const scrollRef = useRef<HTMLDivElement>();
    const navigate = useNavigate();

    const scrollToAbsolute = useCallback(() => {
      if (showAbsoluteData) {
        // TODO: create hook
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth', inline: 'end' });
      }
    }, [showAbsoluteData]);

    const handleHexClick = useCallback(async (user: IUser) => {
      setUserDiagramCalendarRange(calendarRange);
      if (!user?.id) return;
      navigate(`/${DIAGRAM_ROUTE}`, { state: { id: user.id }, relative: 'route' });
    }, [setUserDiagramCalendarRange, calendarRange, navigate]);

    useEffect(() => {
      scrollToAbsolute();
    }, [scrollToAbsolute]);

    if (!department?.users?.length) {
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
              renderTooltip={renderUserTooltip}
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
            <PeopleDynamicViewRateTrend/>
          </Stack>
        )}
      />
    );
  })
;
