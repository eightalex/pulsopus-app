import Stack from "@mui/material/Stack";
import { observer } from "mobx-react";
import { FC, ReactNode, useCallback, useEffect } from "react";

import { Loader } from "@/components/Loader";
import { useStores } from "@/hooks";

interface IRootInitRequestsProps {
    children: ReactNode;
}

export const AppInitRequests: FC<IRootInitRequestsProps> = observer(({ children }) => {

    const {
        rootStore: {
            usersStore: {
                getUsers,
                isLoadingUsers
            },
            departmentsStore: {
                getDepartments,
                isLoadingDepartments
            }
        }
    } = useStores();
    const isLoading = isLoadingUsers || isLoadingDepartments;

    const requestInitData = useCallback(() => {
        getUsers();
        getDepartments();
        // const t = setInterval(() => {
        //     getUsers();
        //     getDepartments();
        // }, 3000);
    }, [getUsers, getDepartments]);

    useEffect(() => {
        requestInitData();
    }, [requestInitData]);

    if (isLoading) {
        return <Loader fullSize/>;
    }

    return (
        <Stack
            flexGrow={1}
            height="100%"
            position='relative'
        >
            {children}
        </Stack>
    );
});