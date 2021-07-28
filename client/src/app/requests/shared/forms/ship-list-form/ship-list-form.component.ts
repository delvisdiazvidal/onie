import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'ui-ship-list-form',
  templateUrl: './ship-list-form.component.html',
  styleUrls: ['./ship-list-form.component.css']
})
export class ShipListFormComponent implements OnInit {

  @Input() shipsForm: FormGroup;

  constructor(private validator: ValidatorsService) { }

  ngOnInit(): void {
  }

  onAddShip(){
    (this.shipsForm.controls.shipList as FormArray).push(
      new FormGroup({
        shipName: new FormControl('', Validators.required),
        shipRegistry: new FormControl('', Validators.required),
        shipFolio: new FormControl('', Validators.required),
        shipLength: new FormControl('', [ Validators.required,
                                        Validators.pattern('^[1-9]+[0-9]*$'),
                                        this.validator.nonZero()]),
        shipBreadth: new FormControl('', [ Validators.required,
                                          Validators.pattern('^[1-9]+[0-9]*$'),
                                          this.validator.nonZero()]),
      })
    );
  }

  onDeleteShip(index: number){
    if ((this.shipsForm.controls.shipList as FormArray).controls.length > 1) {
      (this.shipsForm.controls.shipList as FormArray).removeAt(index);
    }
  }

  getControlsShipList(){
    return (this.shipsForm.controls.shipList as FormArray).controls;
  }

  get errors(){
    return ErrorMesagge;
  }

  shipName(i: number){
    const arrayControl = this.shipsForm.controls.shipList as FormArray;
    return arrayControl.at(i).get('shipName');
  }

  /* get shipName(){
    return this.shipsForm.controls.shipList.get('shipName');
  } */

  shipRegistry(i: number){
    const arrayControl = this.shipsForm.controls.shipList as FormArray;
    return arrayControl.at(i).get('shipRegistry');
  }

  /* get shipRegistry(){
    return this.shipsForm.controls.shipList.get('shipRegistry');
  } */

  shipFolio(i: number){
    const arrayControl = this.shipsForm.controls.shipList as FormArray;
    return arrayControl.at(i).get('shipFolio');
  }

  /* get shipFolio(){
    return this.shipsForm.controls.shipList.get('shipFolio');
  } */

  shipLength(i: number){
    const arrayControl = this.shipsForm.controls.shipList as FormArray;
    return arrayControl.at(i).get('shipLength');
  }

  /* get shipLength(){
    return this.shipsForm.controls.shipList.get('shipLength');
  } */

  shipBreadth(i: number){
    const arrayControl = this.shipsForm.controls.shipList as FormArray;
    return arrayControl.at(i).get('shipBreadth');
  }

  /* get shipBreadth(){
    return this.shipsForm.controls.shipList.get('shipBreadth');
  } */

}
