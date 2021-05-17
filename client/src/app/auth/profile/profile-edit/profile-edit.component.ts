import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { IUser, User } from 'src/app/shared/models/user.model';
import { AuthService } from '../../shared/auth.service';
import { LocationService } from 'src/app/shared/services/location.service';
import { IMunicipalite, Province } from 'src/app/shared/models/locations.model';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'ui-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'row';
  public editForm: FormGroup;
  formTitle = 'Editando Perfil';
  public user: User;
  supscription: Subscription;
  provinces: Province[];
  municipalites: IMunicipalite[];

  constructor(private authService: AuthService,
              private locationService: LocationService,
              private validator: ValidatorsService,
              private router: Router) {
    this.supscription = this.authService.currentUser
        .subscribe( user => this.user = user);
  }

  ngOnInit(): void {
    this.municipalites = this.locationService.getMunicipalites();
    this.provinces = this.locationService.getProvinces();
    this.initForm();
  }

  onSelect(event: { target: { value: any; }; }){
    const provinceCode = Number(event.target.value);
    this.municipalites = this.locationService.getMunicipalitesByProvinceId(provinceCode);
    this.editForm.value.personMunicipalite = this.municipalites[0].municipaliteCode;
  }

  get errors(){
    return ErrorMesagge;
  }

  get username(){
    return this.editForm.get('username');
  }

  get password(){
    return this.editForm.get('password');
  }

  get firstName(){
    return this.editForm.get('firstName');
  }

  get lastName(){
    return this.editForm.get('lastName');
  }

  get personCI(){
    return this.editForm.get('personCI');
  }

  get personEmail(){
    return this.editForm.get('personEmail');
  }

  get personPhone(){
    return this.editForm.get('personPhone');
  }

  get personDir(){
    return this.editForm.get('personDir');
  }

  initForm(){
    this.editForm = new FormGroup({
          username: new FormControl({ value: this.user.username, disabled: true }, Validators.required),
          password: new FormControl({ value: '', disabled: true }),
          firstName: new FormControl(this.user.firstName, [Validators.required,
                                                              this.validator.textValidator()]),
          lastName: new FormControl(this.user.lastName, [Validators.required,
                                                              this.validator.textValidator()]),
          personCI: new FormControl(this.user.personCI, [ Validators.required,
                                          Validators.pattern('^[0-9]+[0-9]*$'),
                                          Validators.minLength(11)]),
          personEmail: new FormControl(this.user.personEmail, [ Validators.required,
                                                                  Validators.email ]),
          personPhone: new FormControl(this.user.personPhone, [  Validators.required,
                                              Validators.pattern('^[0-9]+[0-9]*$'),
                                              Validators.minLength(8)]),
          personDir: new FormControl(this.user.personDir, [Validators.required,
                                                                this.validator.usualPattern()]),
          personProvince: new FormControl(this.user.personProvince.provinceCode, Validators.required),
          personMunicipalite: new FormControl(this.user.personMunicipalite.municipaliteCode, Validators.required),
    });
  }

  private get formValue(): IUser {
    this.user.firstName = this.editForm.value.firstName.trim();
    this.user.lastName = this.editForm.value.lastName.trim();
    this.user.personCI = this.editForm.value.personCI.trim();
    this.user.personEmail = this.editForm.value.personEmail.toLowerCase().trim();
    this.user.personPhone = this.editForm.value.personPhone.trim();
    this.user.personDir = this.editForm.value.personDir.trim();
    this.user.personProvince.provinceCode = this.editForm.value.personProvince;
    this.user.personMunicipalite.municipaliteCode = this.editForm.value.personMunicipalite;

    return this.user;
  }

  onSubmit(){
    this.authService.editProfile(this.formValue);
    this.router.navigate(['/perfil']);
  }

  onCancel(){
    this.editForm.reset();
    this.router.navigate(['/perfil']);
  }

  ngOnDestroy(){
    this.supscription.unsubscribe();
  }

}
