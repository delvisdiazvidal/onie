export interface IReservoir {
    reservoirCode: number;
    reservoirName: string;
    reservoirSurface: number;
}

export class Reservoir {
    public reservoirCode: number;
    public reservoirName: string;
    public reservoirSurface: number;

    constructor(reservoirCode: number, reservoirName: string, reservoirSurface: number) {
        this.reservoirCode = reservoirCode;
        this.reservoirName = reservoirName;
        this.reservoirSurface = reservoirSurface;
    }

}
