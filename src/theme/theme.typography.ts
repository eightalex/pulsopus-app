import '@fontsource-variable/orbitron';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import { CSSProperties } from "react";

// O M 28 - head1
// I M 28 - head2
// I M 22 - title
// I M 18 - subtitle
// I M 16 - body1
// I R 16 - body2
// I M 14 - text
// I R 12 - caption1
// I R 10 - caption2
// I R 8 - caption3
// O M 10 - overline

export interface ITypographyVariants extends Record<string, CSSProperties> {
    // TODO: implement next
}

export interface ITypographyVariantOverrides extends Record<string, boolean> {
    head1: true;
    head2: true;
    title: true;
    subtitle: true;
    body1: true;
    body2: true;
    text: true;
    caption1: true;
    caption2: true;
    caption3: true;
    overline: true;
    inherit: true;
}

export const typographyComponent = {
    defaultProps: {
        variant: 'body1',
        variantMapping: {
            head1: 'h3',
            head2: 'h3',
            title: 'h5',
            subtitle: 'h6',
            body1: 'p',
            body2: 'p',
            text: 'p',
            caption1: 'span',
            caption2: 'span',
            caption3: 'span',
            overline: 'span',
            inherit: 'span',
        },
    },
};

export const typography = {
    fontFamily: [
        'Orbitron Variable',
        'IBM Plex Mono',
        'Rubik Variable',
        'Rubik',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    head1: {
        fontFamily: 'Orbitron Variable',
        fontWeight: 500,
        fontSize: 28,
    },
    head2: {
        fontFamily: 'IBM Plex Mono',
        fontWeight: 400,
        fontSize: 28,
    },
    title: {
        fontFamily: 'IBM Plex Mono',
        fontWeight: 500,
        fontSize: 22,
    },
    subtitle: {
        fontFamily: 'IBM Plex Mono',
        fontWeight: 500,
        fontSize: 18,
    },
    body1: {
        fontFamily: 'IBM Plex Mono',
        fontWeight: 500,
        fontSize: 16,
    },
    body2: {
        fontFamily: 'IBM Plex Mono',
        fontWeight: 400,
        fontSize: 16,
    },
    text: {
        fontFamily: 'IBM Plex Mono',
        fontWeight: 500,
        fontSize: 14,
    },
    caption1: {
        fontFamily: 'IBM Plex Mono',
        fontWeight: 400,
        fontSize: 12,
    },
    caption2: {
        fontFamily: 'IBM Plex Mono',
        fontWeight: 400,
        fontSize: 10,
    },
    caption3: {
        fontFamily: 'IBM Plex Mono',
        fontWeight: 400,
        fontSize: 8,
    },
    overline: {
        fontFamily: 'Orbitron Variable',
        fontWeight: 500,
        fontSize: 10,
    },
    inherit: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
        color: 'inherit',
    },
};
