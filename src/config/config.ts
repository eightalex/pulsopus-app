const { MODE, DEV } = import.meta.env;

export const APP_VERSION: string = process.env.npm_package_version || '0.0.0';
export const IS_DEV: boolean = process.env.NODE_ENV === 'development' || MODE === 'development' || DEV;
export const API_URL: string = process.env.API_URL || '';
export const BASE_URL: string = process.env.BASE_URL || '';
export const CLIENT_URL: string = process.env.CLIENT_URL || '';
export const APP_URL: string = process.env.APP_URL || '';

// CLIENT_URL=http://localhost:5172
// APP_URL=http://localhost:5173
// API_URL=http://localhost:8080/api/v1
//
// #CLIENT_URL=https://pulsopus.dev
// #APP_URL=https://app.pulsopus.dev
// #API_URL=https://api.pulsopus.dev/api/v1
