import { IProvince } from 'src/app/shared/models/locations.model';
import { IPerson, Person } from 'src/app/shared/models/person.model';
import { IUser } from 'src/app/shared/models/user.model';
import { ILicenseType } from './../../../licenses/shared/models/license.model';

export enum RequestStatus {
    Solicitada = 'Solicitada',
    Denegada = 'Denegada',
    Verificada = 'Verificada',
    Aprobada = 'Aprobada'
  }

export interface IRequestStatus {
    requestCode: number;
    requestOrderNumber: string;
    requestType: ILicenseType;
    requestStatus: RequestStatus;
    requestUser: number; // Persona que estaba accediendo a la App en ese momento
    requestObservation: string;
    requestStatusDate: Date;
  }

export interface IRequestSearch {
    requestCode: number;
    requestOrderNumber: string;
    requestType: ILicenseType;
    requestPerson: IPerson;
    requestStatus: string;
    requestProvince: string;
    requestProvinceCode: number;
    requestDate: string;
  }

export interface IRequest {
    requestCode?: number;
    requestOrderNumber: string;
    requestType: ILicenseType;
    requestStatus: RequestStatus;
    requestPerson: IPerson;
    requestProvince: string;
    requestDate?: string;
    requestNotTaxDebt: File;
    requestTaxAboutShipProperty: File;
    requestCertificateOfNavigability: File;
    requestBoatRegistrationCertificate: File;
  }

export class Request implements IRequest{
    public requestCode: number;
    public requestOrderNumber: string;
    public requestType: ILicenseType;
    public requestPerson: Person;
    public requestStatus: RequestStatus;
    public requestProvince: string;
    public requestDate?: string;
    public requestNotTaxDebt: File;
    public requestTaxAboutShipProperty: File;
    public requestCertificateOfNavigability: File;
    public requestBoatRegistrationCertificate: File;

    constructor(requestCode: number,
                requestOrderNumber: string,
                licenseType: ILicenseType,
                requestPerson: Person,
                requestStatus: RequestStatus,
                requestProvince: string,
                requestDate: string,
                requestNotTaxDebt: File,
                requestTaxAboutShipProperty: File,
                requestCertificateOfNavigability: File,
                requestBoatRegistrationCertificate: File) {
        this.requestCode = requestCode;
        this.requestOrderNumber = requestOrderNumber;
        this.requestType = licenseType;
        this.requestPerson = requestPerson;
        this.requestStatus = requestStatus;
        this.requestProvince = requestProvince;
        this.requestDate = requestDate;
        this.requestNotTaxDebt = requestNotTaxDebt;
        this.requestTaxAboutShipProperty = requestTaxAboutShipProperty;
        this.requestCertificateOfNavigability = requestCertificateOfNavigability;
        this.requestBoatRegistrationCertificate = requestBoatRegistrationCertificate;
    }
}
