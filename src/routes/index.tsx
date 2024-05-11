import { lazy } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouteObject } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import LazyLoader from '@/components/LazyLoader';
import {
	ABOUT_ROUTE,
	ADMINISTRATION_ROUTE,
	APP_ADMINISTRATION_ROUTE,
	APP_COMPANY_PULSE_ROUTE,
	APP_EVENTS_ROUTE,
	APP_ROUTE,
	APP_ROUTE_DEFAULT,
	COMPANY_PULSE_ROUTE,
	DIAGRAM_ROUTE,
	EVENTS_ROUTE,
	METHODOLOGY_ROUTE,
	PEOPLE_DYNAMIC_ROUTE,
	ROOT_ID,
	ROOT_ROUTE,
	USER_CASES_ROUTE,
} from '@/constants/routes';

import { ProtectedRoute } from './ProtectedRoute.tsx';

export const routes: RouteObject[] = [
	{
		id: ROOT_ID,
		path: ROOT_ROUTE,
		element: (
			<ProtectedRoute>
				<Layout>
					{/*	<AuthModule/>*/}
					<Outlet/>
				</Layout>
			</ProtectedRoute>
		),
		children: [
			{
				index: true,
				element: <Navigate
					to={APP_ROUTE_DEFAULT}
					replace
				/>,
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
				element: <>{APP_ADMINISTRATION_ROUTE}</>,
			},
			{
				path: EVENTS_ROUTE,
				element: <>{APP_EVENTS_ROUTE}</>,
			},
			{
				path: '*',
				element: <Navigate
					to={APP_ROUTE_DEFAULT}
					replace
				/>,
			}
		],
	},
	{
		path: '*',
		element: <Navigate to={APP_ROUTE} replace />,
	}
];

export const router = createBrowserRouter(routes, { window, basename: '/' });
