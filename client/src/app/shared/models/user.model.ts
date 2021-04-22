import { IMunicipalite, IProvince } from './locations.model';
import { IRoles } from './roles.model';

export interface ILoginFails {
    username: string;
    attempts: number;
}

export interface ILoginUser {
    username: string;
    password: string;
}

export interface IUserPass {
    userCode: number;
    username: string;
    password: string;
}

export interface ISignUpUser {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    personDir: string;
    roleCode: number;
}

export interface IProfileUser {
    firstName: string;
    lastName: string;
    personDir: string;
    personMunicipalite: IMunicipalite;
    personProvince: IProvince;
}

export interface IUser {
    userCode: number;
    username: string;
    firstName: string;
    lastName: string;
    personDir: string;
    personCI: string;
    personMunicipalite: IMunicipalite;
    personProvince: IProvince;
    personPhone: string;
    personEmail: string;
    userRol: IRoles;
    createAt: Date;
    modifyAt: Date;
    expiredAt: Date;
    userToken?: string;
}

export class User implements IUser{
    public userCode: number;
    public username: string;
    public firstName: string;
    public lastName: string;
    public personCI: string;
    public personDir: string;
    public personMunicipalite: IMunicipalite;
    public personProvince: IProvince;
    public personPhone: string;
    public personEmail: string;
    public userRol: IRoles;
    public createAt: Date;
    public modifyAt: Date;
    public expiredAt: Date;
    public userToken?: string;

    constructor(userCode: number,
                username: string,
                firstName: string,
                lastName: string,
                personCI: string,
                personDir: string,
                personMunicipalite: IMunicipalite,
                personProvince: IProvince,
                personPhone: string,
                personEmail: string,
                userRol: IRoles,
                createAt: Date,
                modifyAt: Date,
                expiredAt: Date) {
        this.userCode = userCode;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.personCI = personCI;
        this.personDir = personDir;
        this.personMunicipalite = personMunicipalite;
        this.personProvince = personProvince;
        this.personPhone = personPhone;
        this.personEmail = personEmail;
        this.userRol = userRol;
        this.createAt = createAt;
        this.modifyAt = modifyAt;
        this.expiredAt = expiredAt;
    }
}
