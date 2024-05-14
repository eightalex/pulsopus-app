import { createBrowserRouter, Navigate, Outlet, RouteObject } from 'react-router-dom';

import api from '@/api';
import sessionManager from "@/api/SessionManager.ts";
import { Layout, LayoutSideBar } from '@/components/Layout';
import { CLIENT_URL } from "@/config";
import { EUserRole } from "@/constants/EUser.ts";
import {
	ADMINISTRATION_ROUTE,
	APP_ADMINISTRATION_ROUTE,
	APP_COMPANY_PULSE_ROUTE,
	APP_EVENTS_ROUTE,
	COMPANY_PULSE_ROUTE,
	DIAGRAM_ROUTE,
	EVENTS_ROUTE, LOGOUT_ROUTE,
	PEOPLE_DYNAMIC_ROUTE,
	ROOT_ID,
	ROOT_ROUTE,
	ROUTE_DEFAULT,
} from '@/constants/routes';
import { RequireRoleRoute } from "@/routes/RequireRoleRoute.tsx";

import { ProtectedRoute } from './ProtectedRoute.tsx';

export const routes: RouteObject[] = [
	{
		id: ROOT_ID,
		path: ROOT_ROUTE,
		element: (
			<ProtectedRoute>
				<Layout>
					<LayoutSideBar>
						<Outlet/>
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
				element: <>{PEOPLE_DYNAMIC_ROUTE}</>,
			},
			{
				path: COMPANY_PULSE_ROUTE,
				element: <>{APP_COMPANY_PULSE_ROUTE}</>,
			},
			{
				path: DIAGRAM_ROUTE,
				// element: <UserDiagram/>,
				element: <>{DIAGRAM_ROUTE}</>,
			},
			{
				path: ADMINISTRATION_ROUTE,
				element:
					<RequireRoleRoute allowedRoles={[EUserRole.ADMIN]}>
						{APP_ADMINISTRATION_ROUTE}
					</RequireRoleRoute>
			},
			{
				path: EVENTS_ROUTE,
				element:
					<RequireRoleRoute allowedRoles={[EUserRole.ADMIN]}>
						{APP_EVENTS_ROUTE}
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
