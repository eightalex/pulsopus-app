import MuiTypography, { TypographyProps } from '@mui/material/Typography';
import { ElementType, FC, useMemo } from 'react';

import { IExtendPalette, ITypographyColors } from '@/theme/types';

type PrefixObject<T, P extends string> = {
    [K in keyof T as K extends string ? `${P}.${K}` : never]: T[K];
};

export type TTypographyColorType =
    keyof PrefixObject<ITypographyColors, 'typography'>
    | keyof IExtendPalette
    | 'inherit';

export interface ITypographyProps extends TypographyProps<ElementType, {}> {
    color?: TTypographyColorType;
}

const Typography: FC<ITypographyProps> = ({ color = 'primary', ...rest }) => {
    const c = useMemo(() => color.replace('typography.', ''), [color]);
    return <MuiTypography {...rest} color={`typography.${c}`}/>;
};
export default Typography;
