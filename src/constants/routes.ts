export const ROOT_ID: string = 'root';
export const ROOT_ROUTE: string = '/';

export const ABOUT_ROUTE: string = 'about';
export const METHODOLOGY_ROUTE: string = 'methodology';
export const USER_CASES_ROUTE: string = 'cases';

export const WIDGET_ROUTE: string = 'widget';

export const APP_ROUTE: string = 'app';

export const ACTIVITY_ROUTE: string = 'activity';

export const PEOPLE_DYNAMIC_ROUTE: string = 'team';

export const COMPANY_PULSE_ROUTE: string = 'pulse';

export const DIAGRAM_ROUTE: string = 'person';

export const ADMINISTRATION_ROUTE: string = 'administration';

export const EVENTS_ROUTE: string = 'events';

export const LOGOUT_ROUTE: string = 'logout';

export const PROFILE_ROUTE: string = 'profile';

export const ROUTE_DEFAULT: string = PEOPLE_DYNAMIC_ROUTE;

export const EMPTY_USER_ROUTE: string = ROOT_ROUTE;

const DEFAULT_ROUTE_TITLE = 'Pulsopus';
export const DOCUMENTS_TITLES = {
	[ROOT_ROUTE]: DEFAULT_ROUTE_TITLE,
	[PEOPLE_DYNAMIC_ROUTE]: `${DEFAULT_ROUTE_TITLE} | ${PEOPLE_DYNAMIC_ROUTE}`,
	[ACTIVITY_ROUTE]: `${DEFAULT_ROUTE_TITLE} | ${ACTIVITY_ROUTE}`,
	[COMPANY_PULSE_ROUTE]: `${DEFAULT_ROUTE_TITLE} | ${COMPANY_PULSE_ROUTE}`,
	[DIAGRAM_ROUTE]: `${DEFAULT_ROUTE_TITLE} | ${DIAGRAM_ROUTE}`,
	[ADMINISTRATION_ROUTE]: `${DEFAULT_ROUTE_TITLE} | ${ADMINISTRATION_ROUTE}`,
	[EVENTS_ROUTE]: `${DEFAULT_ROUTE_TITLE} | ${EVENTS_ROUTE}`,
};

export const QUERY_TOKEN = 'token';
export const QUERY_REDIRECT = 'redirect';
