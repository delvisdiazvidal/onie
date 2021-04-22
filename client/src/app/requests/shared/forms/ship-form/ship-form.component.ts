import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';
import { IFishery, IFisheryCraft } from 'src/app/shared/models/utilsModel';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'ui-ship-form',
  templateUrl: './ship-form.component.html',
  styleUrls: ['./ship-form.component.css']
})
export class ShipFormComponent implements OnInit {

  @Input() shipForm: FormGroup;
  @Input() fisherys: IFishery[];
  fisheryCrafts: IFisheryCraft[];
  totalFishery: number;

  constructor(private utilService: UtilsService) { }

  ngOnInit(): void {
    this.fisheryCrafts = this.utilService.getFisheryCraft();
    this.totalFishery = 0;
  }

  get errors(){
    return ErrorMesagge;
  }

  get shipName(){
    return this.shipForm.get('shipName');
  }

  get shipPort(){
    return this.shipForm.get('shipPort');
  }

  get shipFolio(){
    return this.shipForm.get('shipFolio');
  }

  get shipRegistry(){
    return this.shipForm.get('shipRegistry');
  }

  get shipLength(){
    return this.shipForm.get('shipLength');
  }

  get shipBreadth(){
    return this.shipForm.get('shipBreadth');
  }

  get shipRegistryBrut(){
    return this.shipForm.get('shipRegistryBrut');
  }

  get shipEngine(){
    return this.shipForm.get('shipEngine');
  }

  get fisheryCraft(){
    return this.shipForm.get('fisheryCraft');
  }

  get fisheringAreas(){
    return this.shipForm.get('fisheringAreas');
  }

  get fisheryList(){
    return this.shipForm.get('fisheryList');
  }

  getControlsFisheryList(){
    return (this.shipForm.controls.fisheryList as FormArray).controls;
  }

  async getTotalAmount(event){
    this.totalFishery = (this.shipForm.controls.fisheryList as FormArray).controls
      .map((checked, i) => checked.value ? this.fisherys[i].fisheryAmount : null)
      .filter(v => v !== null)
      .reduce((acc, elm) => acc + elm, 0);
  }

}
