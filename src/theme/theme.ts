import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteOptions } from '@mui/material/styles/createPalette';
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { breakpoints, keys } from '@/constants/breakpoints';
import { ITypographyVariantOverrides, ITypographyVariants, typography } from '@/theme/theme.typography';
import { extendPalette, typographyColors } from './extendPalette';
import { components } from './theme.components';
import { IExtendPalette, ITypographyColors } from './types';

declare module '@mui/material/styles/createTheme' {
    interface Theme {
        extendPalette: Partial<IExtendPalette>;
    }

    interface ThemeOptions {
        extendPalette: Partial<IExtendPalette>;
    }

    interface DeprecatedThemeOptions {
        extendPalette: Partial<IExtendPalette>;
    }

}

declare module '@mui/material/IconButton' {
    interface IconButtonClasses {
        colorError: string;
        colorSuccess: string;
        colorDelete: string;
        colorInfo: string;
        colorHide: string;
        sizeExtraSmall: string;
    }

    interface IconButtonPropsSizeOverrides {
        extraSmall: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        opaque: true;
    }
}

declare module '@mui/material/SvgIcon' {
    interface SvgIconClasses {
        colorInfo: true;
        colorCritical: true;
        colorAccent: true;
        colorAccentLight: true;
        colorSuccess: true;
        colorWarning: true;
        colorHide: string;
        fontSizeExtraLarge: true;
        fontSizeExtraLargePlus: true;
        fontSizeLargePlus: true;
        fontSizeExtraSmall: true;
    }

    interface SvgIconPropsColorOverrides {
        critical: true;
        accent: true;
        accentLight: true;
        success: true;
        warning: true;
        hide: true;
    }

    interface SvgIconPropsSizeOverrides {
        extraSmall: true;
        extraLarge: true;
        largePlus: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonClasses {
        textTertiary: true;
    }

    interface ButtonPropsColorOverrides {
        tertiary: true;
    }
}

declare module '@mui/material/styles' {
    interface Theme {
        extendPalette: Partial<IExtendPalette>;
    }

    interface ThemeOptions {
        extendPalette: Partial<IExtendPalette>;
    }

    interface DeprecatedThemeOptions {
        extendPalette: Partial<IExtendPalette>;
    }

    interface TypographyVariants extends ITypographyVariants {
    }

    interface TypographyVariantsOptions extends Partial<ITypographyVariants> {
    }

    interface Palette extends IExtendPalette {
        typography: ITypographyColors;
    }

    interface PaletteOptions extends IExtendPalette {
        typography: ITypographyColors;
    }

    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
        xxl: true;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides extends ITypographyVariantOverrides {
    }
}

declare module '@mui/material/SvgIcon' {
    interface SvgIconClasses {
        colorInfo: true;
        colorCritical: true;
        colorAccent: true;
        colorAccentLight: true;
        colorSuccess: true;
        colorWarning: true;
        colorHide: string;
        fontSizeExtraLarge: true;
        fontSizeExtraLargePlus: true;
        fontSizeLargePlus: true;
        fontSizeExtraSmall: true;
    }

    interface SvgIconPropsColorOverrides {
        critical: true;
        accent: true;
        accentLight: true;
        success: true;
        warning: true;
        hide: true;
    }

    interface SvgIconPropsSizeOverrides {
        extraSmall: true;
        extraLarge: true;
        largePlus: true;
    }
}

const { palette: muiPalette } = createTheme();

const createdTheme: ThemeOptions = {
    extendPalette,
    palette: {
        ...muiPalette,
        ...extendPalette,
        typography: typographyColors,
    } as PaletteOptions,
    spacing: (factor: number = 0) => `${4 * factor}px`,
    components,
    typography: typography as TypographyOptions,
    breakpoints: {
        keys,
        values: breakpoints,
    },
};

export const theme = createTheme(createdTheme);
