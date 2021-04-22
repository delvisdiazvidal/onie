export interface IPenalty {
    penaltyCode?: number;
    penaltyTicket: string;
    penaltyAmount: number;
    penaltyOffense: string;
    penaltyDate?: Date;
    penaltyPersonName: string;
    penaltyPersonCI: string;
    penaltyPersonDir: string;
    penaltyPersonMunicipalite: number;
    penaltyPersonProvince: number;
    penaltyInspector: number;
    penaltyObservations: string;
}

export interface IPenaltyList {
    penaltyCode?: number;
    penaltyTicket: string;
    penaltyAmount: number;
    offenseResolution: string; 
    offenseArticle: string; 
    offenseIncised: string; 
    penaltyDate?: Date;
    inspectorCode: number;
    inspectorName: string;
    penaltyObservations: string;
}

export interface IOffender {
    offenderName: string;
    offenderCI: string;
    offenderDir: string;
    offenderMunicipalite: number;
    offenderProvince: number;
    offenderPenalty: IPenaltyList[];
}

