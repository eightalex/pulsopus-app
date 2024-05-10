import {FC, useMemo} from 'react';
import {IUser} from "@/interfaces";
import Typography from "@/components/Typography";
import Stack from "@mui/material/Stack";

interface IHexbinWidgetUserTooltipProps {
    user: IUser;
}

export const HexbinWidgetUserTooltip: FC<IHexbinWidgetUserTooltipProps> = ({user}) => {
    const userName = useMemo(() => `${user.firstName} ${user.lastName}`, [user])
    return (
        <Stack spacing={1}>
            <Typography
                variant="body1"
                fontSize={12}
                textTransform='uppercase'
                lineHeight={1.25}
            >
                {userName}
            </Typography>
            <Stack spacing={1}>
                <Typography
                    variant="caption1"
                    color='primaryLight'
                    lineHeight={1.25}
                >
                    Position?
                </Typography>
                <Typography
                    variant="caption2"
                    textTransform='uppercase'
                    color='primaryLight'
                    lineHeight={1.25}
                >
                    {user.department.label}
                </Typography>
            </Stack>
        </Stack>
    );
};