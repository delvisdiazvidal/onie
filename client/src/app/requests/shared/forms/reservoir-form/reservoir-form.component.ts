import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { updateLocale } from 'moment';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'ui-reservoir-form',
  templateUrl: './reservoir-form.component.html',
  styleUrls: ['./reservoir-form.component.css']
})
export class ReservoirFormComponent implements OnInit {

  @Input() reservoirForm: FormGroup;

  constructor(private validator: ValidatorsService) { }

  ngOnInit(): void {
  }

  onAddReservoir(){
    (this.reservoirForm.controls.reservoirList as FormArray).push(
      new FormGroup({
        reservoirName: new FormControl('', Validators.required),
        reservoirSurface: new FormControl('', [ Validators.required,
                                                Validators.pattern('^[1-9]+[0-9]*$'),
                                                this.validator.nonZero()])
      })
    );
  }

  onDeleteReservoir(index: number){
    if ((this.reservoirForm.controls.reservoirList as FormArray).controls.length > 1) {
      (this.reservoirForm.controls.reservoirList as FormArray).removeAt(index);
    }
  }

  getControlsReservoirList(){
    return (this.reservoirForm.controls.reservoirList as FormArray).controls;
  }

  get errors(){
    return ErrorMesagge;
  }

  reservoirName(i: number){
    const arrayControl = this.reservoirForm.controls.reservoirList as FormArray;
    return arrayControl.at(i).get('reservoirName');
  }

 /*  get reservoirName(){
    return this.reservoirForm.controls.reservoirLis.get('reservoirName');
  } */

  reservoirSurface(i: number){
    const arrayControl = this.reservoirForm.controls.reservoirList as FormArray;
    return arrayControl.at(i).get('reservoirSurface');
  }

  /* get reservoirSurface(){
    return this.reservoirForm.controls.reservoirLis.get('reservoirSurface');
  } */
}
