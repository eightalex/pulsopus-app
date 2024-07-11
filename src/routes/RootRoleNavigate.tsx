import { observer } from "mobx-react";
import { useMemo } from "react";
import { Navigate } from "react-router-dom";

import { ROUTE_ADMIN_DEFAULT, ROUTE_VIEWER_DEFAULT } from "@/constants/routes.ts";
import { useStores } from "@/hooks";

export const RootRoleNavigate = observer(() => {
    const {
        rootStore: {
            authStore: {
                isAuthorized,
                role,
                isAdmin
            }
        }
    } = useStores();

    const navigatePath = useMemo(() => isAdmin ? ROUTE_ADMIN_DEFAULT:  ROUTE_VIEWER_DEFAULT, [isAdmin]);

    if(!isAuthorized || !role) {
        return <div>Unexpected exception! isAuthorized: {isAuthorized}, role: {role}</div>;
    }

    return <Navigate to={navigatePath} replace/>;
});