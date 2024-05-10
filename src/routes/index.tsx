import { lazy } from 'react';
import { MainLayout } from '@/components/Layout';
import LazyLoader from '@/components/LazyLoader';
import AuthModule from "@/modules/AuthModule";
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
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

const HomePage = LazyLoader(
	lazy(() => import(/* webpackChunkName: 'home page' */ '../pages/HomePage'))
);

const AboutPage = LazyLoader(
	lazy(() => import(/* webpackChunkName: 'about page' */ '../pages/AboutPage'))
);

const MethodologyPage = LazyLoader(
	lazy(() => import(/* webpackChunkName: 'methodology page' */ '../pages/MethodologyPage'))
);

const UserCasesPage = LazyLoader(
	lazy(() => import(/* webpackChunkName: 'user cases page' */ '../pages/UserCasesPage'))
);

const ProtectedRoute = LazyLoader(
	lazy(() => import(/* webpackChunkName: 'protected route' */ './ProtectedRoute'))
);

const AppModule = LazyLoader(
	lazy(() => import(/* webpackChunkName: 'app module' */ '../modules/AppModule'))
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
			<MainLayout>
				<AuthModule/>
				<Outlet/>
			</MainLayout>
		),
		children: [
			{
				index: true,
				element: <HomePage/>,
			},
			{
				path: ABOUT_ROUTE,
				element: <AboutPage/>,
			},
			{
				path: METHODOLOGY_ROUTE,
				element: <MethodologyPage/>,
			},
			{
				path: USER_CASES_ROUTE,
				element: <UserCasesPage/>,
			},
		],
	},
	{
		id: APP_ROUTE,
		path: APP_ROUTE,
		element: (
			<ProtectedRoute>
				<AppModule/>
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
				element: <PeopleDynamic/>,
			},
			{
				path: COMPANY_PULSE_ROUTE,
				element: <>{APP_COMPANY_PULSE_ROUTE}</>,
			},
			{
				path: DIAGRAM_ROUTE,
				element: <UserDiagram/>,
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
		element: <Navigate
			to={APP_ROUTE}
			replace
		/>,
	}
];
