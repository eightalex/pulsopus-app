const { MODE, DEV } = import.meta.env;

export const APP_VERSION: string = process.env.npm_package_version || '0.0.0';
export const IS_DEV: boolean = process.env.NODE_ENV === 'development' || MODE === 'development' || DEV;
export const API_URL: string = process.env.API_URL || '';
export const BASE_URL: string = process.env.BASE_URL || '';
export const APP_URL: string = process.env.APP_URL || '';
