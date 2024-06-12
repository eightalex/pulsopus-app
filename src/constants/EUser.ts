
export const enum EUserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    VIEWER = 'VIEWER',
}

export enum EUserStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    PENDING = 'PENDING',
}

export const userStatusMap = new Map<EUserStatus, string>(Object.entries(EUserStatus).reduce((map, [k, v]) => {
    map.set(k, v);
    return map;
}, new Map()));
