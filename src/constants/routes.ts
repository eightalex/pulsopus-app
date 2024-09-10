import { EUserRole } from "@/constants/EUser.ts";

export const BASELINE = '/';

export const ROOT_ID: string = 'root';
export const ROOT_ROUTE: string = BASELINE;

export const PEOPLE_DYNAMIC_ROUTE: string = 'team';

export const DIAGRAM_ROUTE: string = 'person';

export const MANAGEMENT_ROUTE: string = 'management';

export const EVENTS_ROUTE: string = 'events';

export const PROFILE_ROUTE: string = 'profile';

export const VIEWER_ROUTE_DEFAULT: string = PEOPLE_DYNAMIC_ROUTE;
export const ADMIN_ROUTE_DEFAULT: string = MANAGEMENT_ROUTE;

export const routesByRole: Record<EUserRole, string> = {
	[EUserRole.ADMIN]: ADMIN_ROUTE_DEFAULT,
	[EUserRole.VIEWER]: VIEWER_ROUTE_DEFAULT,
};

export const DEFAULT_ROUTE_TITLE = 'Pulsopus';

export const DOCUMENTS_TITLES = [
	ROOT_ROUTE,
	PEOPLE_DYNAMIC_ROUTE,
	DIAGRAM_ROUTE,
	MANAGEMENT_ROUTE,
	EVENTS_ROUTE,
].reduce((acc, r) => {
	if(r === ROOT_ROUTE) {
		acc[r] = DEFAULT_ROUTE_TITLE;
		return acc;
	}
	acc[r] = `${DEFAULT_ROUTE_TITLE} | ${r}`;
	return acc;
}, {} as { [k: string]: string });

export const DOCUMENTS_DESCRIPTIONS = {
	[ROOT_ROUTE]: DEFAULT_ROUTE_TITLE,
	[PEOPLE_DYNAMIC_ROUTE]: `${DEFAULT_ROUTE_TITLE} team`,
	[DIAGRAM_ROUTE]: `${DEFAULT_ROUTE_TITLE} person`,
	[MANAGEMENT_ROUTE]: `${DEFAULT_ROUTE_TITLE} user management`,
	[EVENTS_ROUTE]: `${DEFAULT_ROUTE_TITLE} events`,
};

export const QUERY_PARAM_LOGIN = 'login';
export const QUERY_PARAM_TOKEN = 'token';
export const QUERY_PARAM_TARGET = 'target';
