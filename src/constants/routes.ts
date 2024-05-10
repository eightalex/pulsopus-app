export const ROOT_ID: string = 'root';
export const ROOT_ROUTE: string = '/';

export const ABOUT_ROUTE: string = 'about';
export const METHODOLOGY_ROUTE: string = 'methodology';
export const USER_CASES_ROUTE: string = 'cases';

export const WIDGET_ROUTE: string = 'widget';

export const APP_ROUTE: string = 'app';

export const ACTIVITY_ROUTE: string = 'activity';
export const APP_ACTIVITY_ROUTE: string = `/${APP_ROUTE}/${ACTIVITY_ROUTE}`;

export const PEOPLE_DYNAMIC_ROUTE: string = 'team';
export const APP_PEOPLE_DYNAMIC_ROUTE: string = `/${APP_ROUTE}/${PEOPLE_DYNAMIC_ROUTE}`;

export const COMPANY_PULSE_ROUTE: string = 'pulse';
export const APP_COMPANY_PULSE_ROUTE: string = `/${APP_ROUTE}/${COMPANY_PULSE_ROUTE}`;

export const DIAGRAM_ROUTE: string = 'person';
export const APP_DIAGRAM_ROUTE: string = `/${APP_ROUTE}/${DIAGRAM_ROUTE}`;

export const ADMINISTRATION_ROUTE: string = 'administration';
export const APP_ADMINISTRATION_ROUTE: string = `/${APP_ROUTE}/${ADMINISTRATION_ROUTE}`;

export const EVENTS_ROUTE: string = 'events';
export const APP_EVENTS_ROUTE: string = `/${APP_ROUTE}/${EVENTS_ROUTE}`;

export const APP_ROUTE_DEFAULT: string = PEOPLE_DYNAMIC_ROUTE;

export const EMPTY_USER_ROUTE: string = ROOT_ROUTE;

const DEFAULT_ROUTE_TITLE = 'Pulsopus';
export const DOCUMENTS_TITLES = {
	[ROOT_ROUTE]: DEFAULT_ROUTE_TITLE,
	[APP_PEOPLE_DYNAMIC_ROUTE]: `${DEFAULT_ROUTE_TITLE} | ${PEOPLE_DYNAMIC_ROUTE}`,
	[APP_ACTIVITY_ROUTE]: `${DEFAULT_ROUTE_TITLE} | ${ACTIVITY_ROUTE}`,
	[APP_COMPANY_PULSE_ROUTE]: `${DEFAULT_ROUTE_TITLE} | ${COMPANY_PULSE_ROUTE}`,
	[APP_DIAGRAM_ROUTE]: `${DEFAULT_ROUTE_TITLE} | ${DIAGRAM_ROUTE}`,
	[APP_ADMINISTRATION_ROUTE]: `${DEFAULT_ROUTE_TITLE} | ${ADMINISTRATION_ROUTE}`,
	[APP_EVENTS_ROUTE]: `${DEFAULT_ROUTE_TITLE} | ${EVENTS_ROUTE}`,
};
