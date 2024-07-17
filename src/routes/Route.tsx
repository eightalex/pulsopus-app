import { observer } from "mobx-react";
import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";

import { DOCUMENTS_DESCRIPTIONS, DOCUMENTS_TITLES, ROOT_ROUTE } from "@/constants/routes.ts";
import RouteHelmet, { IHelmetProps } from "@/routes/RouteHelmet.tsx";

export interface IRouteProps extends Omit<IHelmetProps, 'children'> {
    children?: ReactNode;
}

export const Route: FC<IRouteProps> = observer((props) => {
    const {
        children,
        title= DOCUMENTS_TITLES[ROOT_ROUTE],
        description = DOCUMENTS_DESCRIPTIONS[ROOT_ROUTE],
        canonical
    } = props;
    return (
        <>
            <RouteHelmet
                title={title}
                description={description}
                canonical={canonical}
            />
            {children ? children : <Outlet/>}
        </>);
});

export default Route;
