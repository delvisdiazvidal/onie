import { Request, RequestStatus } from './request.model';
import { IPerson, Person } from 'src/app/shared/models/person.model';
import { ILicenseType } from 'src/app/licenses/shared/models/license.model';
import { IShip, Ship } from 'src/app/shared/models/ship.model';
import { ICompany } from 'src/app/shared/models/company.model';
import { RequestPlatformPrivate } from './request-platform.model';

export interface IRequestPlatform{
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
    requestShip: IShip;
    requestShipCaptain: IPerson;
    requestFisheryType: number[];
    requestFisheryCraft: number;
    fisheringAreas: string;
    requestContractNumber: string;
    requestContract: File;
    requestCompany: ICompany;
  }

export class RequestPlatformState extends RequestPlatformPrivate{
    public requestCompany: ICompany;

    constructor(requestCode: number,
                requestOrderNumber: string,
                licenseType: ILicenseType,
                requestStatus: RequestStatus,
                requestPerson: IPerson,
                requestProvince: string,
                requestDate: string,
                requestNotTaxDebt: File,
                requestTaxAboutShipProperty: File,
                requestCertificateOfNavigability: File,
                requestBoatRegistrationCertificate: File,
                requestShip: IShip,
                requestShipCaptain: IPerson,
                requestFisheryType: number[],
                requestFisheryCraft: number,
                fisheringAreas: string,
                requestContractNumber: string,
                requestContract: File,
                requestCompany: ICompany) {
        super(  requestCode,
                requestOrderNumber,
                licenseType,
                requestStatus,
                requestPerson,
                requestProvince,
                requestDate,
                requestNotTaxDebt,
                requestTaxAboutShipProperty,
                requestCertificateOfNavigability,
                requestBoatRegistrationCertificate,
                requestShip,
                requestShipCaptain,
                requestFisheryType,
                requestFisheryCraft,
                fisheringAreas,
                requestContractNumber,
                requestContract,
                );
        this.requestCompany = requestCompany;
    }
}
