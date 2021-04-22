import { ICompany } from 'src/app/shared/models/company.model';
import { License, LicenseStatus, LicenseThumbs } from './license.model';
import { IShip } from '../../../shared/models/ship.model';
import { IReservoir } from '../../../shared/models/reservoir.model';

export interface ILicenseAquacultureState{
    licenseCode: number;
    licenseOrderNumber: string;
    licenseNotTaxDebt: string;
    licenseTaxAboutShipProperty: string;
    licenseCertificateOfNavigability: string;
    licenseBoatRegistrationCertificate: string;
    licenseThumbs: string;
    licenseType: string;
    licenseStatus: LicenseStatus;
    licenseCompany: ICompany;
    licenseShipList: IShip[];
    licenseIRHCertificate: string;
    licenseReservoirList: IReservoir[];
  }

export class LicenseAquacultureState extends License{
    public licenseCompany: ICompany;
    public licenseShipList: IShip[];
    public licenseIRHCertificate: string;
    public licenseReservoirList: IReservoir[];

    constructor(licenseCode,
                licenseOrderNumber,
                licenseNotTaxDebt,
                licenseTaxAboutShipProperty,
                licenseCertificateOfNavigability,
                licenseBoatRegistrationCertificate,
                licenseThumbs,
                licenseType,
                licenseStatus,
                licenseProvince,
                licenseCompany,
                licenseShipList,
                licenseIRHCertificate,
                licenseReservoirList) {
        super(licenseCode,
              licenseOrderNumber,
              licenseNotTaxDebt,
              licenseTaxAboutShipProperty,
              licenseCertificateOfNavigability,
              licenseBoatRegistrationCertificate,
              licenseThumbs = LicenseThumbs.AquacultureState,
              licenseType = 'Licencia Comercial Acuicola Estatal',
              licenseStatus,
              licenseProvince);
        this.licenseCompany = licenseCompany;
        this.licenseShipList = licenseShipList;
        this.licenseIRHCertificate = licenseIRHCertificate;
        this.licenseReservoirList = licenseReservoirList;
    }
}
