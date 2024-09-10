import { observer } from "mobx-react";
import { useMemo } from "react";
import { Navigate } from "react-router-dom";

import { ADMIN_ROUTE_DEFAULT, routesByRole, VIEWER_ROUTE_DEFAULT } from "@/constants/routes.ts";
import { useStores } from "@/hooks";

export const RootRoleNavigate = observer(() => {
  const {
    rootStore: {
      authStore: {
        isAuthorized,
        role,
        isAdmin,
      }
    }
  } = useStores();

  const navigatePath = useMemo(() => {
    if(!role) {
      return isAdmin ? ADMIN_ROUTE_DEFAULT : VIEWER_ROUTE_DEFAULT;
    }
    return routesByRole[role] || VIEWER_ROUTE_DEFAULT;
  }, [role, isAdmin]);

  if (!isAuthorized || !role) {
    return <div>Unexpected exception! isAuthorized: {isAuthorized}, role: {role}</div>;
  }

  return <Navigate to={navigatePath} replace/>;
});