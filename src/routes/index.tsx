import { lazy } from "react";
import { createBrowserRouter, Navigate, Outlet, RouteObject } from 'react-router-dom';

import { LayoutSideBar } from '@/components/Layout';
import { LazyLoader } from "@/components/LazyLoader";
import { EUserRole } from "@/constants/EUser.ts";
import {
    ADMINISTRATION_ROUTE,
    DIAGRAM_ROUTE, DOCUMENTS_DESCRIPTIONS, DOCUMENTS_TITLES,
    EVENTS_ROUTE,
    PEOPLE_DYNAMIC_ROUTE,
    PROFILE_ROUTE,
    ROOT_ID,
    ROOT_ROUTE,
} from '@/constants/routes';
import { InitialRequester } from "@/modules/root";
import { RootRoleNavigate } from "@/routes/RootRoleNavigate.tsx";

import { ProtectedRoute } from "./ProtectedRoute.tsx";
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
                    <InitialRequester>
                        <Outlet/>
                    </InitialRequester>
                </LayoutSideBar>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <RootRoleNavigate/>,
            },
            {
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
                path: ADMINISTRATION_ROUTE,
                element:
                    <RequireRoleRoute
                        allowedRoles={[EUserRole.ADMIN]}
                        title={DOCUMENTS_TITLES[ADMINISTRATION_ROUTE]}
                        canonical={ADMINISTRATION_ROUTE}
                        description={DOCUMENTS_DESCRIPTIONS[ADMINISTRATION_ROUTE]}
                    >
                        <AdministrationModule/>
                    </RequireRoleRoute>
            },
            {
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
                path: PROFILE_ROUTE,
                element: <>{PROFILE_ROUTE}</>,
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

export const router = createBrowserRouter(routes, { window, basename: '/' });