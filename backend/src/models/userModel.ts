import * as bcrypt from "bcryptjs";
import { IRoles } from "./rolesModel";
import { IMunicipalite, IProvince } from "./utilsModel";

export interface ILogInUser{
  username: string;
  password: string;
}

export interface UpdateUser{
  userCode: number;
  username: string;
  password: string;
  modifyAt: Date;
  expiredAt: Date;
}

export interface IUserData{
  userCode?: number;
  username: string;
  password: string;
  expiredAt?: Date;
  enableUser?: boolean;
}

export class UserData implements IUserData {
  public userCode?: number;
  public username: string;
  public password: string;
  public expiredAt?: Date;
  public enableUser?: boolean;

  constructor(user: IUserData) {
    this.userCode = user.userCode;
    this.username = user.username;
    this.password = user.password;
    this.expiredAt = user.expiredAt;
    this.enableUser = user.enableUser;
  }

  public async hashPassword(): Promise<void> {
      const salt = await bcrypt.genSalt(10);
      this.password = bcrypt.hashSync(this.password, salt);
  }
  
  public async checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): Promise<boolean> {
      return await bcrypt.compare(unencryptedPassword, this.password);
  }
}

export interface IPersonData{
  userCode?: number;
  firstName: string;
  lastName: string;
  personDir: string;
}

export interface IUserRole{
  userCode?: number;
  roleCode?: number;
}

export interface IPerson{
  personCode?: number;
  firstName: string;
  lastName: string;
  personCI: string;
  personDir: string;
  personMunicipalite: number;
  personProvince: number;
  personPhone: string;
  personEmail: string;
  personCompany?: string;
  createAt?: string;
  modifyAt?: string;
}

export interface IUserPerson{
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  personCI: string;
  personDir: string;
  personMunicipalite: number;
  personProvince: number;
  personPhone: string;
  personEmail: string;
  roleCode: number;
  createAt?: Date;
  modifyAt?: Date;
  expiredAt?: Date;
}

export interface IUser{
    userCode?: number;
    username: string;
    firstName: string;
    lastName: string;
    personCI: string;
    personDir: string;
    personMunicipalite: IMunicipalite;
    personProvince: IProvince;
    personPhone: string;
    personEmail: string;
    userRol: IRoles;
    createAt?: Date;
    modifyAt?: Date;
    expiredAt?: Date;
    userToken?: string;
}

export class User implements IUser {
    userCode?: number;
    username: string;
    firstName: string;
    lastName: string;
    personCI: string;
    personDir: string;
    personMunicipalite: IMunicipalite;
    personProvince: IProvince;
    personPhone: string;
    personEmail: string;
    userRol: IRoles;
    createAt?: Date;
    modifyAt?: Date;
    expiredAt?: Date;
    userToken?: string;
  
    constructor(user: IUser) {
      this.userCode = user.userCode;
      this.username = user.username;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.personCI = user.personCI;
      this.personDir = user.personDir;
      this.personMunicipalite = user.personMunicipalite;
      this.personProvince = user.personProvince;
      this.personPhone = user.personPhone;
      this.personEmail = user.personEmail;
      this.userRol = user.userRol;
      this.createAt = user.createAt;
      this.modifyAt = user.modifyAt;
      this.expiredAt = user.expiredAt;
    }
  }
