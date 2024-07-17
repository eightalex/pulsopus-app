
export enum EUserRole {
    // MANAGER = 'MANAGER',
    VIEWER = 'VIEWER',
    ADMIN = 'ADMIN',
}

export enum EUserStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    PENDING = 'PENDING',
}

export enum EUserStatusPendingResolve {
    ACCEPT = 'ACCEPT',
    DECLINE = 'DECLINE',
}