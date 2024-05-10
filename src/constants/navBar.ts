import { ISideNavBarLink } from '@/components/SideNavBar';
import {
	APP_ADMINISTRATION_ROUTE,
	APP_COMPANY_PULSE_ROUTE,
	APP_DIAGRAM_ROUTE,
	APP_EVENTS_ROUTE,
	APP_PEOPLE_DYNAMIC_ROUTE
} from '@/constants/routes';
import { DiagramUpBoldIcon, OptionsOutlinedIcon, PeopleOutlinedIcon, StatsChartIcon, TodayOutlinedIcon } from '@/icons';

export const NAV_LABELS_BY_PATH = {
	[APP_PEOPLE_DYNAMIC_ROUTE]: 'Team Pulse', // People dynamic
	[APP_COMPANY_PULSE_ROUTE]: 'Company pulse',
	[APP_DIAGRAM_ROUTE]: 'Person Pulse', // Diagram
	[APP_ADMINISTRATION_ROUTE]: 'Administration',
	[APP_EVENTS_ROUTE]: 'Events journal',
};

export const NAV_ICON_BY_PATH = {
	[APP_PEOPLE_DYNAMIC_ROUTE]: PeopleOutlinedIcon,
	[APP_COMPANY_PULSE_ROUTE]: DiagramUpBoldIcon,
	[APP_DIAGRAM_ROUTE]: StatsChartIcon,
	[APP_ADMINISTRATION_ROUTE]: OptionsOutlinedIcon,
	[APP_EVENTS_ROUTE]: TodayOutlinedIcon,
};

// TODO: implement module | uncomment options
export const SIDE_NAV_OPTIONS = [
	APP_PEOPLE_DYNAMIC_ROUTE,
	// APP_COMPANY_PULSE_ROUTE,
	APP_DIAGRAM_ROUTE,
	// APP_ADMINISTRATION_ROUTE,
	// APP_EVENTS_ROUTE,
];

export const sideNavOptions: ISideNavBarLink[] = SIDE_NAV_OPTIONS.map((path) => ({
	path,
	icon: NAV_ICON_BY_PATH[path],
	label: NAV_LABELS_BY_PATH[path],
}));
