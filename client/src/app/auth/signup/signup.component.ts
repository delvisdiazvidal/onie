import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { ISignUpUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'ui-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  signForm: FormGroup;
  returnUrl: string;
  loading = false;
  error = '';


  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    // this.signForm = this.route.snapshot.queryParams.returnUrl || '/';
  }

  initForm(){
    this.signForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      personDir: new FormControl('', Validators.required),
      roleCode: new FormControl(10, Validators.required),
      personCompany: new FormControl('', Validators.required),
    });
  }

  private get formValue(): ISignUpUser {

    const newUser: ISignUpUser = {
      username: this.signForm.value.username.trim().toLowerCase(),
      password: this.signForm.value.password,
      firstName: this.signForm.value.firstName.trim(),
      lastName: this.signForm.value.lastName.trim(),
      personDir: this.signForm.value.personDir.trim(),
      roleCode: this.signForm.value.roleCode,
    };

    return newUser;
  }

  onSubmit(){
    this.authService.signUp(this.formValue);
    this.signForm.reset();
    this.router.navigate(['/']);
  }

}
