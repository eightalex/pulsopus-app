import { observer } from "mobx-react";
import { FC, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { EUserRole } from "@/constants/EUser.ts";
import { ROOT_ROUTE } from "@/constants/routes.ts";
import { useStores } from "@/hooks";
import Route, { IRouteProps } from "@/routes/Route.tsx";

interface IRequireRoleRouteProps extends IRouteProps {
    allowedRoles: EUserRole[];
    fallbackPath?: string;
}
export const RequireRoleRoute:FC<IRequireRoleRouteProps> = observer((props) => {
    const {
        allowedRoles = [],
        fallbackPath = ROOT_ROUTE,
        ...restProps
    } = props;
    const location = useLocation();
    const {
        rootStore: {
            authStore: {
                role: userRole
            }
        }
    } = useStores();


    const isExistRole = useMemo(
        () => {
            if(!allowedRoles.length) return true;
             return allowedRoles.includes(userRole);
        },
        [userRole, allowedRoles]);

    const fallbackNavigatePath = useMemo(
        () => fallbackPath.startsWith('/')
            ? fallbackPath
            : `/${fallbackPath}`,
        [fallbackPath]);


    return (
        isExistRole
            ? <Route {...restProps}/>
            : <Navigate to={fallbackNavigatePath} state={{ from: location }} replace />
    );
});
