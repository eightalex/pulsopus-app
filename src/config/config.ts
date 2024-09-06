const { MODE, DEV } = import.meta.env;

export const APP_VERSION: string = process.env.npm_package_version || '0.0.0';
export const IS_DEV: boolean = process.env.NODE_ENV === 'development' || MODE === 'development' || DEV;
export const API_DOMAIN: string = process.env.API_DOMAIN || 'localhost:8080';
export const API_PREFIX: string = process.env.API_PREFIX || 'api';
export const API_VERSION: string = process.env.API_VERSION || 'v1';
export const API_PROTOCOL: string = process.env.API_PROTOCOL || 'http';
export const API_SOCKET_PROTOCOL: string = process.env.API_SOCKET_PROTOCOL || 'ws';
export const API_URL: string = process.env.API_URL || `${API_PROTOCOL}://${API_DOMAIN}/${API_PREFIX}/${API_VERSION}`;
export const BASE_URL: string = process.env.BASE_URL || '';
export const CLIENT_URL: string = process.env.CLIENT_URL || '';
export const APP_URL: string = process.env.APP_URL || '';
