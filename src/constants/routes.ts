export const BASELINE = '/';

// ROOT
export const ROOT_ID: string = 'root';
export const ROOT_ROUTE: string = BASELINE;

// PEOPLE DYNAMIC
export const PEOPLE_DYNAMIC_ROUTE: string = 'team';

// DIAGRAM
export const DIAGRAM_ROUTE: string = 'person';

// ADMINISTRATION
export const ADMINISTRATION_ROUTE: string = 'management';

// EVENTS
export const EVENTS_ROUTE: string = 'events';

// PROFILE
export const PROFILE_ROUTE: string = 'profile';

export const ROUTE_VIEWER_DEFAULT: string = PEOPLE_DYNAMIC_ROUTE;
export const ROUTE_ADMIN_DEFAULT: string = ADMINISTRATION_ROUTE;
export const ROUTE_DEFAULT: string = PEOPLE_DYNAMIC_ROUTE;

export const DEFAULT_ROUTE_TITLE = 'Pulsopus';

export const DOCUMENTS_TITLES = [
	ROOT_ROUTE,
	PEOPLE_DYNAMIC_ROUTE,
	DIAGRAM_ROUTE,
	ADMINISTRATION_ROUTE,
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
	[ADMINISTRATION_ROUTE]: `${DEFAULT_ROUTE_TITLE} user management`,
	[EVENTS_ROUTE]: `${DEFAULT_ROUTE_TITLE} events`,
};

export const QUERY_TOKEN = 'token';
export const QUERY_REDIRECT = 'target';
