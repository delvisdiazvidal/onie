export enum StepCode {
    PersonalInfo = 'PersonalInfo',
    CaptainInfo = 'CaptainInfo',
    CompanyInfo = 'CompanyInfo',
    ShipsInfo = 'ShipsInfo',
    ReservoirsInfo = 'ReservoirsInfo',
    DocsInfo = 'DocsInfo',
    ShipInfo = 'ShipInfo',
    ConfirmInfo = 'ConfirmInfo',
  }

export interface StepInfo {
    number: number;
    code: StepCode;
    description: string;
    next: {
        title: string;
        code: StepCode;
        cssClass: string;
    };
    back: {
        title: string;
        code: StepCode;
        cssClass: string;
    };
}
