import { FC, ReactNode } from "react";
import { Helmet as ReactHelmet } from "react-helmet";

import { APP_URL } from "@/config";
import { DEFAULT_ROUTE_TITLE } from "@/constants/routes.ts";
export interface IHelmetProps {
    title?: string;
    canonical?: string;
    description?: string;
    children?: ReactNode;
}

const createCanonicalHref = (...routes: string[]) => {
    if(!routes.length || !routes.join('').length) return APP_URL;
    return `${APP_URL}/${routes.join('/')}`;
};

export const RouteHelmet: FC<IHelmetProps> = (props) => {
    const {
        children,
        title = DEFAULT_ROUTE_TITLE,
        description = 'Pulsopus application',
        canonical= '',
    } = props;
    return (
        <ReactHelmet>
            <meta charSet="utf-8"/>
            <title>{title}</title>
            <link rel="canonical" href={createCanonicalHref(canonical)}/>
            <meta name="description" content={description}/>
            {children}
        </ReactHelmet>
    );
};

export default RouteHelmet;