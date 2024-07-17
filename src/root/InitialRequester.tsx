import { observer } from "mobx-react";
import { FC, ReactNode, useCallback, useLayoutEffect, useMemo } from "react";

import { Loader } from "@/components/Loader";
import { useStores } from "@/hooks";

interface IInitialRequesterProps {
    children?: ReactNode;
}

export const InitialRequester: FC<IInitialRequesterProps> = observer(({ children }) => {
    const {
        rootStore: {
            usersStore: { getUsers, isLoadingUsers },
            departmentsStore: { getDepartments, isLoadingDepartments },
        }
    } = useStores();

    const isLoading = useMemo(
        () => isLoadingUsers || isLoadingDepartments
        ,  [isLoadingDepartments, isLoadingUsers]);

    const callInitRequest = useCallback(() => {
        getUsers();
        getDepartments();
    }, [getDepartments, getUsers]);

    useLayoutEffect(() => {
        callInitRequest();
    }, [callInitRequest]);

    if(isLoading) {
        return <Loader fullSize/>;
    }

    return children;
});