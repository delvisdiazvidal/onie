import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';
import { IMunicipalite, Province } from 'src/app/shared/models/locations.model';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'ui-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  @Input() userForm: FormGroup;
  @Input() formTitle: string;
  provinces: Province[];
  municipalites: IMunicipalite[];

  constructor(private route: ActivatedRoute,
              private locationService: LocationService,
              private router: Router) { }

  ngOnInit(): void {
    this.municipalites = this.locationService.getMunicipalites();
    this.provinces = this.locationService.getProvinces();
  }

  onSelect(event: { target: { value: any; }; }){
    const provinceCode = Number(event.target.value);
    this.municipalites = this.locationService.getMunicipalitesByProvinceId(provinceCode);
    this.userForm.value.personMunicipalite = this.municipalites[0].municipaliteCode;
  }

  get errors(){
    return ErrorMesagge;
  }

  get username(){
    return this.userForm.get('username');
  }

  get password(){
    return this.userForm.get('password');
  }

  get firstName(){
    return this.userForm.get('firstName');
  }

  get lastName(){
    return this.userForm.get('lastName');
  }

  get personCI(){
    return this.userForm.get('personCI');
  }

  get personEmail(){
    return this.userForm.get('personEmail');
  }

  get personPhone(){
    return this.userForm.get('personPhone');
  }

  get personDir(){
    return this.userForm.get('personDir');
  }

}
