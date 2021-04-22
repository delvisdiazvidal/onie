export interface IMix {

  mixId: number;
  mixName: string;
  mixUm: string;
  mixCost: number;
  mixCant: number;
  ofertId: number;
}

export class Ingredient {
  public mixName: string;
  public mixUm: string;
  public mixCost: number;
  public mixCant: number;
  public ofertId: number;
  public mixId: number;

  constructor(mix: IMix){
    this.mixId = mix.mixId;
    this.mixName = mix.mixName;
    this.mixUm = mix.mixUm;
    this.mixCost = mix.mixCost;
    this.mixCant = mix.mixCant;
    this.ofertId = mix.ofertId;
  }
}

