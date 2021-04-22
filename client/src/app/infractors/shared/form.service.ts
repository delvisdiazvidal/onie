import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { IPenalty } from './infractor.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public infractorForm: FormGroup;

  constructor(private validator: ValidatorsService) {
   }

  public initForm(){
    this.infractorForm = new FormGroup({
      penaltyTicket: new FormControl('', [Validators.required,
                                          this.validator.codeValidator()]),
      penaltyAmount: new FormControl('', [Validators.required,
                                          this.validator.nonZero()]),
      penaltyOffense: new FormControl('', Validators.required),
      penaltyPersonName: new FormControl('', [Validators.required,
                                              this.validator.textValidator()]),
      penaltyPersonCI: new FormControl('', [Validators.required,
                                            Validators.pattern('^[0-9]+[0-9]*$'),
                                            Validators.minLength(11),
                                            Validators.maxLength(11)]),
      penaltyPersonDir: new FormControl('', [Validators.required,
                                            this.validator.usualPattern()]),
      penaltyPersonMunicipalite: new FormControl(1, Validators.required),
      penaltyPersonProvince: new FormControl(1, Validators.required),
      penaltyInspector: new FormControl('', [Validators.required,
                                            this.validator.textValidator()]),
      penaltyObservations: new FormControl('', [Validators.required,
                                                this.validator.usualPattern()]),
    });
  }

  get penaltyTicket(){
    return this.infractorForm.get('penaltyTicket');
  }

  get penaltyAmount(){
    return this.infractorForm.get('penaltyAmount');
  }

  get penaltyOffense(){
    return this.infractorForm.get('penaltyOffense');
  }

  get penaltyPersonName(){
    return this.infractorForm.get('penaltyPersonName');
  }

  get penaltyPersonCI(){
    return this.infractorForm.get('penaltyPersonCI');
  }

  get penaltyPersonDir(){
    return this.infractorForm.get('penaltyPersonDir');
  }

  get penaltyPersonMunicipalite(){
    return this.infractorForm.get('penaltyPersonMunicipalite');
  }

  setPenaltyPersonMunicipalite(id: number){
    this.infractorForm.value.penaltyPersonMunicipalite = id;
  }

  get penaltyPersonProvince(){
    return this.infractorForm.get('penaltyPersonProvince');
  }

  get penaltyInspector(){
    return this.infractorForm.get('penaltyInspector');
  }

  get penaltyObservations(){
    return this.infractorForm.get('penaltyObservations');
  }

  public getformValue(): IPenalty {
    const infactorValue: IPenalty = {
      penaltyCode: null,
      penaltyTicket: this.infractorForm.value.penaltyTicket.toUpperCase().trim(),
      penaltyAmount: this.infractorForm.value.penaltyAmount,
      penaltyOffense: this.infractorForm.value.penaltyOffense.trim(),
      penaltyDate: new Date(Date.now()),
      penaltyPersonName: this.infractorForm.value.penaltyPersonName.trim(),
      penaltyPersonCI: this.infractorForm.value.penaltyPersonCI.trim(),
      penaltyPersonDir: this.infractorForm.value.penaltyPersonDir.trim(),
      penaltyPersonMunicipalite: this.infractorForm.value.penaltyPersonMunicipalite,
      penaltyPersonProvince: this.infractorForm.value.penaltyPersonProvince,
      penaltyInspector: this.infractorForm.value.penaltyInspector,
      penaltyObservations: this.infractorForm.value.penaltyObservations.trim()
    };
    return infactorValue;
  }

  /* populate(penalty: IPenalty) {
    this.infractorForm.setValue({
      route_id: penalty.route_id,
      route_code: penalty.route_code,
      route_name: penalty.route_name,
      route_distance: penalty.route_distance,
      route_description: penalty.route_description
      });
  } */

}
