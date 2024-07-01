import Stack from '@mui/material/Stack';
import { FC, useMemo } from 'react';

import { Loader } from "@/components/Loader";
import Typography from '@/components/Typography';
import { IUser } from "@/interfaces";

interface IPeopleDynamicViewDiagramUserTooltipProps {
    user: IUser;
    rate: number;
}

export const PeopleDynamicViewDiagramUserTooltip: FC<IPeopleDynamicViewDiagramUserTooltipProps> = ({ rate, user }) => {
    const { username, position, department } = user;

    const subtitles = useMemo(() => {
        return [department?.label, position?.label].filter(t => !!t);
    }, [position, department]);

    if(!user) {
        return <Loader/>;
    }

    return (
        <Stack
            spacing={1}
            sx={{
                userSelect: 'none',
                touchAction: 'none',
            }}
        >
            <Typography
                variant="body1"
                fontSize={12}
                textTransform='uppercase'
                lineHeight={1.25}
            >
                {username}
            </Typography>
            <Stack direction='row' spacing={1}>
                <Typography
                    variant="body1"
                    fontSize={12}
                    lineHeight={1}
                >
                    Activity rate&#58;
                </Typography>
                <Typography
                    variant="body1"
                    fontSize={12}
                    textTransform='uppercase'
                    lineHeight={1}
                >
                    {Boolean(rate) && <>&asymp;</>}
                    <>{Math.floor(rate)}&#37;</>
                </Typography>
            </Stack>
            {Boolean(subtitles.length) && (
                <Stack spacing={0.5}>
                    {subtitles.map((t) => (
                        <Typography
                            key={t}
                            variant="caption1"
                            color='primaryLight'
                            lineHeight={1}
                        >
                            {t}
                        </Typography>
                    ))}
                </Stack>
            )}
        </Stack>
    );
};