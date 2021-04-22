export interface IFile {
    fileCode?: number;
    fileTitle: string;
    fileInfo: string;
    fileDestination: string;
    fileName: string;
    filePath: string;
    fileSize: number;
  }

export interface IDocs {
    requestCode: string;
    notTaxDebtFile: string;
    taxAboutShipPropertyFile: File;
    certificateOfNavigabilityFile: File;
    boatRegistrationCertificateFile: File;
  }

export interface IContractDocs{
    requestCode: number;
    contractNumber: string;
    contractFile: File;
  }

export interface IContractDocsString{
    requestCode: number;
    contractNumber: string;
    contractFile: string;
  }