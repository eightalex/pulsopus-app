import { ReactNode } from "react";

export const enum EViewInfoType {
    POSITIVE = 'POSITIVE',
    NEGATIVE = 'NEGATIVE',
}

export interface IViewInfoProps {
    title?: string | ReactNode;
    subtitles?: string[] | ReactNode;
    type?: EViewInfoType,
}