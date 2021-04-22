import { Request, RequestStatus } from './request.model';
import { IPerson, Person } from 'src/app/shared/models/person.model';
import { ILicenseType } from 'src/app/licenses/shared/models/license.model';
import { IShip, Ship } from 'src/app/shared/models/ship.model';

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
  }

export class RequestPlatformPrivate extends Request{
    public requestShip: Ship;
    public requestShipCaptain: Person;
    public requestFisheryType: number[];
    public requestFisheryCraft: number;
    public fisheringAreas: string;
    public requestContractNumber: string;
    public requestContract: File;

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
                requestBoatRegistrationCertificate,
                );
        this.requestShip = requestShip;
        this.requestShipCaptain = requestShipCaptain;
        this.requestFisheryType = requestFisheryType;
        this.requestFisheryCraft = requestFisheryCraft;
        this.fisheringAreas = fisheringAreas;
        this.requestContractNumber = requestContractNumber;
        this.requestContract = requestContract;
    }
}
