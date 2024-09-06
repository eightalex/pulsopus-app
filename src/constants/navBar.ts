import { EUserRole } from "@/constants/EUser.ts";
import {
	DIAGRAM_ROUTE,
	EVENTS_ROUTE,
	MANAGEMENT_ROUTE,
	PEOPLE_DYNAMIC_ROUTE
} from '@/constants/routes';
import { OptionsOutlinedIcon, PeopleOutlinedIcon, StatsChartIcon, TodayOutlinedIcon } from '@/icons';

export const NAV_LABELS_BY_PATH = {
	[PEOPLE_DYNAMIC_ROUTE]: 'Team Pulse',
	[DIAGRAM_ROUTE]: 'Person Pulse',
	[MANAGEMENT_ROUTE]: 'User Management',
	[EVENTS_ROUTE]: 'Events journal',
};

export const NAV_ICON_BY_PATH = {
	[PEOPLE_DYNAMIC_ROUTE]: PeopleOutlinedIcon,
	[DIAGRAM_ROUTE]: StatsChartIcon,
	[MANAGEMENT_ROUTE]: OptionsOutlinedIcon,
	[EVENTS_ROUTE]: TodayOutlinedIcon,
};

export const SIDE_NAV_OPTIONS_BY_ROLES: Record<string, EUserRole[]> = {
	[PEOPLE_DYNAMIC_ROUTE]: [EUserRole.VIEWER],
	[DIAGRAM_ROUTE]: [EUserRole.VIEWER],
	[MANAGEMENT_ROUTE]: [EUserRole.ADMIN],
	[EVENTS_ROUTE]: [EUserRole.ADMIN],
};

export const SIDEBAR_LOGO_WIDTH_MIN = 134;
export const SIDEBAR_LOGO_WIDTH = SIDEBAR_LOGO_WIDTH_MIN;

export const SIDEBAR_LOGO_HEIGHT_MIN = 15;
export const SIDEBAR_LOGO_HEIGHT = 18;
