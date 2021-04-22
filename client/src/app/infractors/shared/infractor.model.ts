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
    penaltyInspector?: number;
    penaltyObservations: string;
}

export interface IInfractor {
    penaltyPersonName: string;
    penaltyPersonCI: string;
    penaltyPersonDir: string;
}
