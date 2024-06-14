import { EUserRole } from "@/constants/EUser.ts";
import {
	ADMINISTRATION_ROUTE,
	DIAGRAM_ROUTE,
	EVENTS_ROUTE,
	PEOPLE_DYNAMIC_ROUTE
} from '@/constants/routes';
import { OptionsOutlinedIcon, PeopleOutlinedIcon, StatsChartIcon, TodayOutlinedIcon } from '@/icons';

export const NAV_LABELS_BY_PATH = {
	[PEOPLE_DYNAMIC_ROUTE]: 'Team Pulse', // People dynamic
	[DIAGRAM_ROUTE]: 'Person Pulse', // Diagram
	[ADMINISTRATION_ROUTE]: 'Administration',
	[EVENTS_ROUTE]: 'Events journal',
};

export const NAV_ICON_BY_PATH = {
	[PEOPLE_DYNAMIC_ROUTE]: PeopleOutlinedIcon,
	// [COMPANY_PULSE_ROUTE]: DiagramUpBoldIcon,
	[DIAGRAM_ROUTE]: StatsChartIcon,
	[ADMINISTRATION_ROUTE]: OptionsOutlinedIcon,
	[EVENTS_ROUTE]: TodayOutlinedIcon,
};

const allRoles = Object.values(EUserRole).map((v) => v as EUserRole);

export const SIDE_NAV_OPTIONS_BY_ROLES: Record<string, EUserRole[]> = {
	[PEOPLE_DYNAMIC_ROUTE]: allRoles,
	[DIAGRAM_ROUTE]: allRoles,
	[ADMINISTRATION_ROUTE]: [EUserRole.ADMIN, EUserRole.MANAGER],
	[EVENTS_ROUTE]: [EUserRole.ADMIN, EUserRole.MANAGER],
};
