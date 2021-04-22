import { IPerson } from 'src/app/shared/models/person.model';
import { License, LicenseStatus, LicenseThumbs } from './license.model';

export interface ILicenseAquaculturePrivate{
    licenseCode: number;
    licenseOrderNumber: string;
    licenseNotTaxDebt: string;
    licenseTaxAboutShipProperty: string;
    licenseCertificateOfNavigability: string;
    licenseBoatRegistrationCertificate: string;
    licenseThumbs: string;
    licenseType: string;
    licenseStatus: LicenseStatus;
    licenseOwner: IPerson;
    licenseContractNumber: string;
    licenseContract: string;
  }

export class LicenseAquaculturePrivate extends License{
    public licenseOwner: IPerson;
    public licenseContractNumber: string;
    public licenseContract: string;

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
                licenseOwner,
                licenseContractNumber,
                licenseContract) {
        super(licenseCode,
              licenseOrderNumber,
              licenseNotTaxDebt,
              licenseTaxAboutShipProperty,
              licenseCertificateOfNavigability,
              licenseBoatRegistrationCertificate,
              licenseThumbs = LicenseThumbs.AquaculturePrivate,
              licenseType = 'Licencia Comercial Acuicola no Estatal',
              licenseStatus,
              licenseProvince);
        this.licenseOwner = licenseOwner;
        this.licenseContractNumber = licenseContractNumber;
        this.licenseContract = licenseContract;
    }

}

