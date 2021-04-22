import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';
import { IUser, IUserPass } from 'src/app/shared/models/user.model';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'ui-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public passForm: FormGroup = new FormGroup({});
  public currentUser: IUser;
  public usedPass: boolean;

  constructor(private authService: AuthService,
              private validator: ValidatorsService,
              private formBuilder: FormBuilder) {
    this.authService.currentUser
        .subscribe( user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.usedPass = false;
    this.passForm = this.formBuilder.group({
      username: new FormControl({ value: this.currentUser.username, disabled: true }, Validators.required),
      password: new FormControl('', [Validators.required,
                                      this.validator.oldPassValidator()]),
      newPassword: new FormControl('', [Validators.required,
                                        this.validator.strongPassValidator(),
                                        Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, {
        validator: [
          this.validator.checkPasswords('newPassword', 'confirmPassword'),
          this.validator.currentPassword('password', 'newPassword'),
        ]
    });
  }

  get errors(){
    return ErrorMesagge;
  }

  get f(){
    return this.passForm.controls;
  }

  get password(){
    return this.passForm.get('password');
  }

  get newPassword(){
    return this.passForm.get('newPassword');
  }

  get confirmPassword(){
    return this.passForm.get('confirmPassword');
  }

  get formValue(): any {
    const newUser: IUserPass = {
      userCode: this.currentUser.userCode,
      username: this.currentUser.username,
      password: this.passForm.value.newPassword
    };
    return newUser;
  }

  inValidForm(){
    if (!this.passForm.valid){
        return true;
     }
   }

  onSubmit(){
    return this.authService.isUsedPassword(this.passForm.value.newPassword)
        .subscribe( (res) => {
          if (res) {
            this.usedPass = true;
          } else {
            this.authService.changePassword(this.formValue);
            this.passForm.reset();
          }
        });
  }

}
