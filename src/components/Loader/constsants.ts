import { TLoaderSize } from "@/components/Loader/types.ts";
import { extendPalette } from "@/theme";

export const loaderSizes: Record<TLoaderSize, { width: number, height: number }> = {
    small: {
        height: 24,
        width: 24,
    },
    medium: {
        height: 50,
        width: 50,
    },
};

export const BASE_COLOR = extendPalette.loaderSurfaceDefault;