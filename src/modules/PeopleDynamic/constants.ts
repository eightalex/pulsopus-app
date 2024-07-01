import { EPeopleDynamicView } from "@/constants/EPeopleDynamic.ts";
import { ListIcon, PeopleOutlinedIcon } from "@/icons";

export const viewIcons = {
    [EPeopleDynamicView.CHART]: ListIcon,
    [EPeopleDynamicView.TABLE]: PeopleOutlinedIcon,
};

export const viewButtonTitles = {
    [EPeopleDynamicView.CHART]: 'Table view',
    [EPeopleDynamicView.TABLE]: 'Hex View',
};
