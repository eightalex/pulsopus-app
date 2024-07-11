import { observer } from "mobx-react";
import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";

import RouteHelmet, { IHelmetProps } from "@/routes/RouteHelmet.tsx";

export interface IRouteProps extends Omit<IHelmetProps, 'children'> {
    children?: ReactNode;
}

export const Route: FC<IRouteProps> = observer((props) => {
    const {
        children,
        title,
        description,
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
