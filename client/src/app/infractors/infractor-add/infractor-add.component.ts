import { Component, OnInit } from '@angular/core';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';
import { IMunicipalite, Province } from 'src/app/shared/models/locations.model';
import { LocationService } from 'src/app/shared/services/location.service';
import { PenaltyService } from 'src/app/infractors/shared/penalty.service';
import { FormService } from '../shared/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'ui-infractor-add',
  templateUrl: './infractor-add.component.html',
  styleUrls: ['./infractor-add.component.css']
})
export class InfractorAddComponent implements OnInit {

  provinces: Province[];
  municipalites: IMunicipalite[];

  /** Agregar Selector de Fecha */

  constructor(private locationService: LocationService,
              private route: ActivatedRoute,
              private router: Router,
              private notifyService: NotificationService,
              private penaltyService: PenaltyService,
              private form: FormService) { }

  ngOnInit(): void {
    this.locationService.fetchMunicipalites();
    this.locationService.fetchProvinces();
    this.municipalites = this.locationService.getMunicipalites();
    this.provinces = this.locationService.getProvinces();
    this.form.initForm();
  }

  onSelect(event: { target: { value: any; }; }){
    const provinceCode = Number(event.target.value);
    this.municipalites = this.locationService.getMunicipalitesByProvinceId(provinceCode);
    this.form.setPenaltyPersonMunicipalite(this.municipalites[0].municipaliteCode);
  }

  get errors(){ return ErrorMesagge; }
  get infractorForm(){ return this.form.infractorForm; }
  get penaltyTicket(){ return this.form.penaltyTicket; }
  get penaltyAmount(){ return this.form.penaltyAmount; }
  get penaltyOffense(){ return this.form.penaltyOffense; }
  get penaltyPersonName(){ return this.form.penaltyPersonName; }
  get penaltyPersonCI(){ return this.form.penaltyPersonCI; }
  get penaltyPersonDir(){ return this.form.penaltyPersonDir; }
  get penaltyPersonMunicipalite(){ return this.form.penaltyPersonMunicipalite; }
  get penaltyPersonProvince(){ return this.form.penaltyPersonProvince; }
  get penaltyInspector(){ return this.form.penaltyInspector; }
  get penaltyObservations(){ return this.form.penaltyObservations; }

  inValidForm(){
    if (!this.form.infractorForm.valid){
      return true;
    }
  }

  onCancel(){
    this.form.infractorForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit(){
    console.log(this.form.getformValue());

    if (this.form.infractorForm.valid) {
      this.penaltyService.addPenalty(this.form.getformValue());
      this.form.infractorForm.reset();
    } else {
      this.notifyService.showError('Por Favor, Complete el Formulario');
    }
  }

}
