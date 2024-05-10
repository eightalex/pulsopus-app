import { IExtendPalette, ITypographyColors } from '@/theme/types';
import MuiTypography, { TypographyProps } from '@mui/material/Typography';
import { ElementType, FC } from 'react';

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

const Typography: FC<ITypographyProps> = ({ color = 'primary', ...rest }) => <MuiTypography {...rest}
                                                                                          color={`typography.${color}`}/>;
export default Typography;
