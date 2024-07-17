import { EUserRole } from "@/constants/EUser.ts";
import { SIDE_NAV_OPTIONS_BY_ROLES } from "@/constants/navBar.ts";

export const getSidebarNavLinksByRoles = (role: EUserRole): string[] => {
    return Object
        .entries(SIDE_NAV_OPTIONS_BY_ROLES)
        .reduce((result, [path, roles]) => {
            if(roles.length && !roles.includes(role)) return result;
            return [...result, path];
        }, [] as string[]);
};