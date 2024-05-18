import { lazy } from "react";
import { createBrowserRouter, Navigate, Outlet, RouteObject } from 'react-router-dom';

import api from '@/api';
import sessionManager from "@/api/SessionManager.ts";
import { Layout, LayoutSideBar } from '@/components/Layout';
import { LazyLoader } from "@/components/LazyLoader";
import { CLIENT_URL } from "@/config";
import { EUserRole } from "@/constants/EUser.ts";
import {
	ADMINISTRATION_ROUTE,
	DIAGRAM_ROUTE,
	EVENTS_ROUTE, LOGOUT_ROUTE,
	PEOPLE_DYNAMIC_ROUTE, PROFILE_ROUTE,
	ROOT_ID,
	ROOT_ROUTE,
	ROUTE_DEFAULT,
} from '@/constants/routes';
import { AppInitRequests } from "@/modules/Root/AppInitRequests.tsx";
import { RequireRoleRoute } from "@/routes/RequireRoleRoute.tsx";

import { ProtectedRoute } from './ProtectedRoute.tsx';

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
				<Layout>
					<LayoutSideBar>
						<AppInitRequests>
							<Outlet/>
						</AppInitRequests>
					</LayoutSideBar>
				</Layout>
			</ProtectedRoute>
		),
		children: [
			{
				index: true,
				element: <Navigate to={ROUTE_DEFAULT} replace />,
			},
			{
				path: PEOPLE_DYNAMIC_ROUTE,
				// element: <PeopleDynamic/>,
				element: <span>{PEOPLE_DYNAMIC_ROUTE}</span>,
			},
			{
				path: DIAGRAM_ROUTE,
				// element: <UserDiagram/>,
				element: <span>{DIAGRAM_ROUTE}</span>,
			},
			{
				path: ADMINISTRATION_ROUTE,
				element:
					<RequireRoleRoute allowedRoles={[EUserRole.ADMIN]}>
						<AdministrationModule/>
					</RequireRoleRoute>
			},
			{
				path: EVENTS_ROUTE,
				element:
					<RequireRoleRoute allowedRoles={[EUserRole.ADMIN]}>
						<EventsModule/>
					</RequireRoleRoute>
			},
			{
				path: LOGOUT_ROUTE,
				element: <span>{LOGOUT_ROUTE}</span>,
				async loader() {
					return api.authService.onLogout();
				},
				async action() {
					sessionManager.removeTokens();
					window.location.replace(CLIENT_URL);
				}
			},
			{
				path: PROFILE_ROUTE,
				element: <>{PROFILE_ROUTE}</>,
			},
			{
				path: '*',
				element: <Navigate to={ROOT_ROUTE} replace />,
			}
		],
	},
	{
		path: '*',
		element: <Navigate to={ROOT_ROUTE} replace />,
	}
];

export const router = createBrowserRouter(routes, { window, basename: '/' });
