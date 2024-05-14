import { FC, ReactNode, useMemo } from "react";
import { Navigate, Outlet,useLocation } from "react-router-dom";

import { EUserRole } from "@/constants/EUser.ts";
import { ROOT_ROUTE } from "@/constants/routes.ts";
import { useSelector } from "@/hooks";
import { selectAuthRoles } from "@/stores/auth";

interface IProtectedAdminRouteProps {
	children?: ReactNode;
    allowedRoles: EUserRole[];
    fallbackPath?: string;
}
export const RequireRoleRoute:FC<IProtectedAdminRouteProps> = (
    { children, allowedRoles = [], fallbackPath = ROOT_ROUTE }
) => {
    const userRoles = useSelector(selectAuthRoles);
    console.log('userRoles', userRoles);
    const location = useLocation();

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
};