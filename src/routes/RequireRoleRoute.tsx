import { observer } from "mobx-react";
import { FC, ReactNode, useMemo } from "react";
import { Navigate, Outlet,useLocation } from "react-router-dom";

import { EUserRole } from "@/constants/EUser.ts";
import { ROOT_ROUTE } from "@/constants/routes.ts";
import { useStores } from "@/hooks";

interface IProtectedAdminRouteProps {
	children?: ReactNode;
    allowedRoles: EUserRole[];
    fallbackPath?: string;
}
export const RequireRoleRoute:FC<IProtectedAdminRouteProps> = observer((props) => {
    const { children, allowedRoles = [], fallbackPath = ROOT_ROUTE } = props;
    const location = useLocation();
    const {
        rootStore: {
            authStore: {
                roles: userRoles
            }
        }
    } = useStores();

    const isExistRole = useMemo(
        () => userRoles?.find(role => allowedRoles?.includes(role)),
        [userRoles, allowedRoles]);

    const fallbackNavigatePath = useMemo(
        () => fallbackPath.startsWith('/')
            ? fallbackPath
            : `/${fallbackPath}`,
        [fallbackPath]);

    return (
        isExistRole
            ? children ?? <Outlet/>
            : <Navigate to={fallbackNavigatePath} state={{ from: location }} replace />
    );
});
