import { Request, RequestStatus } from './request.model';
import { ILicenseType } from 'src/app/licenses/shared/models/license.model';
import { IProvince } from 'src/app/shared/models/locations.model';
import { IPerson, Person } from 'src/app/shared/models/person.model';

export interface IRequestAquaculturePrivate{
    requestCode?: number;
    requestOrderNumber: string;
    requestType: ILicenseType;
    requestStatus: RequestStatus;
    requestPerson: IPerson;
    requestProvince: string;
    requestDate: string;
    requestNotTaxDebt: File;
    requestTaxAboutShipProperty: File;
    requestCertificateOfNavigability: File;
    requestBoatRegistrationCertificate: File;
    requestContractNumber: string;
    requestContract: File;
  }

export class RequestAquaculturePrivate extends Request{
    public requestContractNumber: string;
    public requestContract: File;

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
                requestBoatRegistrationCertificate: File,
                requestContractNumber: string,
                requestContract: File) {
        super(  requestCode,
                requestOrderNumber,
                licenseType,
                requestPerson,
                requestStatus,
                requestProvince,
                requestDate,
                requestNotTaxDebt,
                requestTaxAboutShipProperty,
                requestCertificateOfNavigability,
                requestBoatRegistrationCertificate);
        this.requestContractNumber = requestContractNumber;
        this.requestContract = requestContract;
    }
}
