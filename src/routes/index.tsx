import { lazy } from "react";
import { createBrowserRouter, Navigate, Outlet, RouteObject } from 'react-router-dom';
import { InitialRequester } from "src/root";

import { LayoutSideBar } from '@/components/Layout';
import { LazyLoader } from "@/components/LazyLoader";
import { EUserRole } from "@/constants/EUser.ts";
import {
  BASELINE,
  DIAGRAM_ROUTE,
  DOCUMENTS_DESCRIPTIONS,
  DOCUMENTS_TITLES,
  EVENTS_ROUTE,
  MANAGEMENT_ROUTE,
  PEOPLE_DYNAMIC_ROUTE,
  ROOT_ID,
  ROOT_ROUTE
} from '@/constants/routes';
import { RootRoleNavigate } from "@/routes/RootRoleNavigate.tsx";

import { ProtectedRoute } from "./ProtectedRoute";
import { RequireRoleRoute } from "./RequireRoleRoute.tsx";

const AdministrationModule = LazyLoader(
  lazy(() => import(/* webpackChunkName: 'administration module' */ '../modules/AdministrationModule'))
);

const EventsModule = LazyLoader(
  lazy(() => import(/* webpackChunkName: 'events module' */ '../modules/EventsModule'))
);

const PeopleDynamic = LazyLoader(
  lazy(() => import(/* webpackChunkName: 'people dynamic module' */ '../modules/PeopleDynamic'))
);

const UserDiagram = LazyLoader(
  lazy(() => import(/* webpackChunkName: 'user diagram module' */ '../modules/UserDiagram'))
);

export const routes: RouteObject[] = [
  {
    id: ROOT_ID,
    path: ROOT_ROUTE,
    element: (
      <ProtectedRoute>
        <LayoutSideBar>
          {/*    <InitialRequester>*/}
          {/*    </InitialRequester>*/}
          <Outlet/>
        </LayoutSideBar>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <RootRoleNavigate/>,
      },
      {
        id: PEOPLE_DYNAMIC_ROUTE,
        path: PEOPLE_DYNAMIC_ROUTE,
        element:
          <RequireRoleRoute
            allowedRoles={[EUserRole.VIEWER]}
            title={DOCUMENTS_TITLES[PEOPLE_DYNAMIC_ROUTE]}
            canonical={PEOPLE_DYNAMIC_ROUTE}
            description={DOCUMENTS_DESCRIPTIONS[PEOPLE_DYNAMIC_ROUTE]}
          >
            <PeopleDynamic/>
          </RequireRoleRoute>
      },
      {
        id: DIAGRAM_ROUTE,
        path: DIAGRAM_ROUTE,
        element:
          <RequireRoleRoute
            allowedRoles={[EUserRole.VIEWER]}
            title={DOCUMENTS_TITLES[DIAGRAM_ROUTE]}
            canonical={DIAGRAM_ROUTE}
            description={DOCUMENTS_DESCRIPTIONS[DIAGRAM_ROUTE]}
          >
            <UserDiagram/>
          </RequireRoleRoute>
      },
      {
        id: MANAGEMENT_ROUTE,
        path: MANAGEMENT_ROUTE,
        element:
          <RequireRoleRoute
            allowedRoles={[EUserRole.ADMIN]}
            title={DOCUMENTS_TITLES[MANAGEMENT_ROUTE]}
            canonical={MANAGEMENT_ROUTE}
            description={DOCUMENTS_DESCRIPTIONS[MANAGEMENT_ROUTE]}
          >
            <AdministrationModule/>
          </RequireRoleRoute>
      },
      {
        id: EVENTS_ROUTE,
        path: EVENTS_ROUTE,
        element:
          <RequireRoleRoute
            allowedRoles={[EUserRole.ADMIN]}
            title={DOCUMENTS_TITLES[EVENTS_ROUTE]}
            canonical={EVENTS_ROUTE}
            description={DOCUMENTS_DESCRIPTIONS[EVENTS_ROUTE]}
          >
            <EventsModule/>
          </RequireRoleRoute>
      },
      {
        path: '*',
        element: <RootRoleNavigate/>,
      }
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROOT_ROUTE} replace/>,
  }
];

export const router = createBrowserRouter(routes, { window, basename: BASELINE });