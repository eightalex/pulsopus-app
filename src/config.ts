const { MODE, DEV, VITE_API_URL } = import.meta.env;

declare const PACKAGE_VERSION: string;

export const IS_DEV: boolean = MODE === 'development' || DEV;
export const APP_VERSION: string = PACKAGE_VERSION;
export const API_URL: string = VITE_API_URL;
