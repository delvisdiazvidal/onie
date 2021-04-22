import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';

@Component({
  selector: 'ui-ship-list-form',
  templateUrl: './ship-list-form.component.html',
  styleUrls: ['./ship-list-form.component.css']
})
export class ShipListFormComponent implements OnInit {

  @Input() shipsForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  onAddShip(){
    (this.shipsForm.controls.shipList as FormArray).push(
      new FormGroup({
        shipName: new FormControl('', Validators.required),
        shipRegistry: new FormControl('', Validators.required),
        shipFolio: new FormControl('', Validators.required),
        shipLength: new FormControl('', [ Validators.required,
                                        Validators.pattern('^[1-9]+[0-9]*$')]),
        shipBreadth: new FormControl('', [ Validators.required,
                                          Validators.pattern('^[1-9]+[0-9]*$')])
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

  get shipName(){
    return this.shipsForm.controls.shipList.get('shipName');
  }

  get shipRegistry(){
    return this.shipsForm.controls.shipList.get('shipRegistry');
  }

  get shipFolio(){
    return this.shipsForm.controls.shipList.get('shipFolio');
  }

  get shipLength(){
    return this.shipsForm.controls.shipList.get('shipLength');
  }

  get shipBreadth(){
    return this.shipsForm.controls.shipList.get('shipBreadth');
  }

}
