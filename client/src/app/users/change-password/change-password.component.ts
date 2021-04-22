import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IUser, IUserPass } from 'src/app/shared/models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';

@Component({
  selector: 'ui-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  public passForm: FormGroup = new FormGroup({});
  public subscription: Subscription;
  public userItem: IUser;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private validator: ValidatorsService,
              private router: Router,
              private formBuilder: FormBuilder) {}

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
    this.passForm = this.formBuilder.group({
      username: new FormControl({ value: this.userItem.username, disabled: true }, Validators.required),
      newPassword: new FormControl('', [Validators.required,
                                        this.validator.strongPassValidator(),
                                        Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, {
      validator: [
        this.validator.checkPasswords('newPassword', 'confirmPassword')
      ]
    });
  }

  get errors(){
    return ErrorMesagge;
  }

  get f(){
    return this.passForm.controls;
  }

  get newPassword(){
    return this.passForm.get('newPassword');
  }

  get confirmPassword(){
    return this.passForm.get('confirmPassword');
  }

  get formValue(): any {
    const newUser: IUserPass = {
      userCode: this.userItem.userCode,
      username: this.userItem.username,
      password: this.passForm.value.newPassword
    };
    return newUser;
  }

  onSubmit(){
    this.userService.changePassword(this.formValue);
    this.passForm.reset();
    this.router.navigate(['usuarios']);
  }

  onCancel(){
    this.passForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
