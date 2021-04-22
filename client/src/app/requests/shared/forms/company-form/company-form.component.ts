import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMunicipalite, Province } from 'src/app/shared/models/locations.model';
import { LocationService } from 'src/app/shared/services/location.service';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';

@Component({
  selector: 'ui-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {

  @Input() companyForm: FormGroup;

  provinces: Province[];
  municipalites: IMunicipalite[];

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.municipalites = this.locationService.getMunicipalites();
    this.provinces = this.locationService.getProvinces();
  }

  onSelect(event){
    const provinceCode = Number(event.target.value);
    this.municipalites = this.locationService.getMunicipalitesByProvinceId(provinceCode);
    this.companyForm.value.personMunicipalite = this.municipalites[0].municipaliteCode;
  }

  get errors(){
    return ErrorMesagge;
  }

  get companyREEUP(){
    return this.companyForm.get('companyREEUP');
  }

  get companyName(){
    return this.companyForm.get('companyName');
  }

  get entityName(){
    return this.companyForm.get('entityName');
  }

  get fishingBrigade(){
    return this.companyForm.get('fishingBrigade');
  }

  get companyDir(){
    return this.companyForm.get('companyDir');
  }

  get companyProvince(){
    return this.companyForm.get('companyProvince');
  }

  get companyMunicipalite(){
    return this.companyForm.get('companyMunicipalite');
  }

}
