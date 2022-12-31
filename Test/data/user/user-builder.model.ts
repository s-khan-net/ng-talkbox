import { IUser, IRole } from '../../../src/app/models/user.model';


export class UserBuilder {

    private constructor() {
    }
    private id: any;
    private name: string = '';
    private email: string = '';
    private avatar?: string;
    private role: IRole = { roleName: '', roleDesc: '' };

    public static newUser(): UserBuilder {
        return new UserBuilder();
    }

    public static anyUser(): UserBuilder {
        return new UserBuilder()
            .withUserId('1')
            .withName('joe_bloggs')
            .withEmailAddress('joe_bloggs@tmv.com')
            .withRole(RoleBuilder.anyRole().build());
    }
    public withRole(value: IRole): UserBuilder {
        this.role = value;
        return this;
    }

    public withUserId(value: string): UserBuilder {
        this.id = value;
        return this;
    }

    public withName(value: string): UserBuilder {
        this.name = value;
        return this;
    }

    public withEmailAddress(value: string): UserBuilder {
        this.email = value;
        return this;
    }

    public build(): IUser {
        const user: IUser = {
            id: this.id,
            name: this.name,
            email: this.email,
            avatar: this.avatar,
            role: this.role
        }
        return user;
    }
}

export class RoleBuilder {

    private constructor() {
    }

    private roleName: string = '';
    private roleDesc: string = '';

    public static newRole(): RoleBuilder {
        return new RoleBuilder();
    }

    public static anyRole(): RoleBuilder {
        return this.newRole()
            .withRoleName('default role')
            .withRoleDesc('Default role desc.')
    }
    withRoleDesc(value: string): RoleBuilder {
        this.roleDesc = value;
        return this;
    }
    public withRoleName(value: string): RoleBuilder {
        this.roleName = value;
        return this;
    }

    public build(): IRole {
        const role: IRole = {
            roleName: this.roleName,
            roleDesc: this.roleDesc
        }
        return role
    }
}