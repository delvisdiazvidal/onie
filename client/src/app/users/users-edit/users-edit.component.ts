import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'ui-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  userItem: IUser;
  editForm: FormGroup;
  editTitle = 'Editar Usuario';

  constructor(  private userService: UserService,
                private validator: ValidatorsService,
                private route: ActivatedRoute,
                private router: Router ) { }

  ngOnInit(): void {
    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          const index = +params.id;
          this.userItem = this.userService.getUsersItem(index);
          this.initForm();
        }
      );
  }

  private initForm(){
    this.editForm = new FormGroup({
      username: new FormControl({ value: this.userItem.username, disabled: true }, Validators.required),
      password: new FormControl({ value: '', disabled: true }),
      firstName: new FormControl(this.userItem.firstName, [Validators.required,
                                                          this.validator.textValidator()]),
      lastName: new FormControl(this.userItem.lastName, [Validators.required,
                                                          this.validator.textValidator()]),
      personCI: new FormControl(this.userItem.personCI, [ Validators.required,
                                      Validators.pattern('^[0-9]+[0-9]*$'),
                                      Validators.minLength(11)]),
      roleCode: new FormControl(this.userItem.userRol.roleCode, Validators.required),
      personEmail: new FormControl(this.userItem.personEmail, Validators.email),
      personPhone: new FormControl(this.userItem.personPhone, [  Validators.required,
                                          Validators.pattern('^[0-9]+[0-9]*$'),
                                          Validators.minLength(8)]),
      personDir: new FormControl(this.userItem.personDir, [Validators.required,
                                                            this.validator.usualPattern()]),
      personProvince: new FormControl(this.userItem.personProvince.provinceCode, Validators.required),
      personMunicipalite: new FormControl(this.userItem.personMunicipalite.municipaliteCode, Validators.required),
    });
  }


  private get formValue(): IUser {

    this.userItem.firstName = this.editForm.value.firstName.trim();
    this.userItem.lastName = this.editForm.value.lastName.trim();
    this.userItem.personCI = this.editForm.value.personCI.trim();
    this.userItem.userRol.roleCode = this.editForm.value.roleCode;
    this.userItem.personEmail = this.editForm.value.personEmail.toLowerCase().trim();
    this.userItem.personPhone = this.editForm.value.personPhone.trim();
    this.userItem.personDir = this.editForm.value.personDir.trim();
    this.userItem.personProvince.provinceCode = this.editForm.value.personProvince;
    this.userItem.personMunicipalite.municipaliteCode = this.editForm.value.personMunicipalite;

    return this.userItem;
  }

  onSubmit(){
    this.userService.editUser(this.formValue);
    this.editForm.reset();
    /** Revisar para ir a User Details */
    this.router.navigate(['usuarios']);
  }

  onCancel(){
    this.editForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
