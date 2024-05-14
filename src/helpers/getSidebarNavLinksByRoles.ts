import { EUserRole } from "@/constants/EUser.ts";
import { SIDE_NAV_OPTIONS_BY_ROLES } from "@/constants/navBar.ts";

export const getSidebarNavLinksByRoles = (userRoles: EUserRole[]): string[] => Object
    .entries(SIDE_NAV_OPTIONS_BY_ROLES)
    .reduce((result, [path, roles]) => {
        if(!roles.find(r => userRoles.includes(r))) return result;
        return [...result, path];
    }, [] as string[]);