import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMunicipalite, Province } from 'src/app/shared/models/locations.model';
import { LocationService } from 'src/app/shared/services/location.service';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  @Input() personForm: FormGroup;
  provinces: Province[];
  municipalites: IMunicipalite[];

  constructor(private locationService: LocationService,
              private router: Router) { }

  ngOnInit(): void {
    of(this.getProvinceList()).subscribe(elemet => {
      this.provinces = elemet;
    });
    this.getMunicipaliteList();
  }

  private getProvinceList() {
    return this.locationService.getProvinces();
  }

  private getMunicipaliteList() {
    if (this.locationService.getMunicipalites().length > 0){
      this.municipalites = this.locationService.getMunicipalites();
    } else {
      this.router.navigate(['solicitudes/nueva-solicitud']);
    }
  }

  onSelect(event){
    const provinceCode = Number(event.target.value);
    this.municipalites = this.locationService.getMunicipalitesByProvinceId(provinceCode);
    this.personForm.value.personMunicipalite = this.municipalites[0].municipaliteCode;
  }

  get errors(){
    return ErrorMesagge;
  }

  get personName(){
    return this.personForm.get('personName');
  }

  get personLastName(){
    return this.personForm.get('personLastName');
  }

  get personCI(){
    return this.personForm.get('personCI');
  }

  get personEmail(){
    return this.personForm.get('personEmail');
  }

  get personPhone(){
    return this.personForm.get('personPhone');
  }

  get personDir(){
    return this.personForm.get('personDir');
  }

}
