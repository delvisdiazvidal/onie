export enum Roles {
    SUPERADMIN = 'SUPERADMIN',
    ADMIN = 'ADMIN',
    ADVANCED = 'ADVANCED',
    USER = 'USER'
}

export interface IRoles {
    roleCode: number;
    roleShort: string;
    roleName: string;
}
