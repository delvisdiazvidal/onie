import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../shared/user.service';
import { IUser } from 'src/app/shared/models/user.model';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'ui-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {
  addForm: FormGroup;
  addTitle = 'Adicionar Usuario';

  constructor(private router: Router,
              private validator: ValidatorsService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private get formValue(): IUser {
    this.addForm.value.username = this.addForm.value.username.toLowerCase().trim();
    this.addForm.value.firstName = this.addForm.value.firstName.trim();
    this.addForm.value.lastName = this.addForm.value.lastName.trim();
    this.addForm.value.personEmail = this.addForm.value.personEmail.toLowerCase().trim();
    this.addForm.value.personDir = this.addForm.value.personDir.trim();
    this.addForm.value.personPhone = this.addForm.value.personPhone.trim();

    return this.addForm.value;
  }

  private initForm(){
    this.addForm = new FormGroup({
      username: new FormControl('', [ Validators.required,
                                      this.validator.userNameValidator(),
                                      Validators.minLength(5)]),
      password: new FormControl('', [ Validators.required,
                                      this.validator.strongPassValidator(),
                                      Validators.minLength(6)]),
      firstName: new FormControl('', [Validators.required,
                                      this.validator.textValidator()]),
      lastName: new FormControl('', [Validators.required,
                                      this.validator.textValidator()]),
      personCI: new FormControl('', [ Validators.required,
                                      Validators.pattern('^[0-9]+[0-9]*$'),
                                      Validators.minLength(11)]),
      roleCode: new FormControl(30, Validators.required),
      personEmail: new FormControl('', Validators.email),
      personPhone: new FormControl('', [  Validators.required,
                                          Validators.pattern('^[0-9]+[0-9]*$'),
                                          Validators.minLength(8)]),
      personDir: new FormControl('', [Validators.required,
                                      this.validator.usualPattern()]),
      personProvince: new FormControl(1, Validators.required),
      personMunicipalite: new FormControl(1, Validators.required),
    });
  }

  inValidForm(){
    if (!this.addForm.valid){
        return true;
     }
   }

  onSubmit(){
    this.userService.addUser(this.formValue);
    this.initForm();
  }

  onCancel(){
    this.initForm();
  }

}
