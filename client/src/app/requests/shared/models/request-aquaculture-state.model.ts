import { ILicenseType } from 'src/app/licenses/shared/models/license.model';
import { IReservoir } from 'src/app/shared/models/reservoir.model';
import { IShipAquaculture } from 'src/app/shared/models/ship.model';
import { Company, ICompany } from 'src/app/shared/models/company.model';
import { IPerson, Person } from 'src/app/shared/models/person.model';
import { Request, RequestStatus } from './request.model';

export interface IRequestAquacultureState{
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
    requestCompany: ICompany;
    requestShipList: IShipAquaculture[];
    requestIRHCertificate: File;
    requestReservoirList: IReservoir[];
  }

export class RequestAquacultureState extends Request{
    public requestCompany: ICompany;
    public requestShipList: IShipAquaculture[];
    public requestIRHCertificate: File;
    public requestReservoirList: IReservoir[];

    constructor(requestCode: number,
                requestOrderNumber: string,
                licenseType: ILicenseType,
                requestStatus: RequestStatus,
                requestPerson: Person,
                requestProvince: string,
                requestDate: string,
                requestNotTaxDebt: File,
                requestTaxAboutShipProperty: File,
                requestCertificateOfNavigability: File,
                requestBoatRegistrationCertificate: File,
                requestCompany: Company,
                requestShipList: IShipAquaculture[],
                requestIRHCertificate: File,
                requestReservoirList: IReservoir[]) {
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
                    requestBoatRegistrationCertificate );
            this.requestCompany = requestCompany;
            this.requestShipList = requestShipList;
            this.requestIRHCertificate = requestIRHCertificate;
            this.requestReservoirList = requestReservoirList;
    }
}
