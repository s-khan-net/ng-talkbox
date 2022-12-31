export interface IUser {
    id: any,
    name: string,
    email: string,
    avatar?: string,
    role: IRole,
}

export interface IRole {
    roleName: string;
    roleDesc: string;
}