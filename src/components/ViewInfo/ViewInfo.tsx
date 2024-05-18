import Stack from "@mui/material/Stack";
import { FC, useMemo } from "react";

import Typography from '@/components/Typography';

import { IViewInfoProps } from "./types.ts";

export const ViewInfo: FC<IViewInfoProps> = (props) => {
    const { title, subtitles } = props;

    const renderTitle = useMemo(() => {
        if(typeof title === 'string') {
            return (
                <Typography
                    variant="subtitle"
                    textTransform="uppercase"
                    // color={color}
                >
                    {title}
                </Typography>
            );
        }
        return title;
    }, [title]);


    const renderSubtitle = useMemo(() => {
        if(!subtitles) return;
        if(!Array.isArray(subtitles)) return subtitles;
        return (
            <Stack spacing={0.5}>
                {subtitles.map((subtitle = '', index) => (
                    <Typography
                        key={`${index}-${subtitle}`}
                        variant="body2"
                        // color={color}
                    >
                        {subtitle}
                    </Typography>
                ))}
            </Stack>
        );
    }, [subtitles]);

    return (
        <Stack spacing={4}>
            {Boolean(title) || Boolean(renderSubtitle) && (
                <Stack>
                    {Boolean(title) && (
                        <Stack spacing={0}>
                            {renderTitle}
                        </Stack>
                    )}
                    {Boolean(renderSubtitle) && renderSubtitle}
                </Stack>
            )}
        </Stack>
    );
};