import { Component, OnInit, HostBinding, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from './../shared/auth.service';
import { ILoginFails, ILoginUser } from 'src/app/shared/models/user.model';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';

@Component({
  selector: 'ui-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, AfterViewInit {
  @HostBinding('class') classes = 'row';
  @ViewChild('autofocus') username: ElementRef;
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  error = '';

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  ngAfterViewInit() {
    this.username.nativeElement.focus();
  }

  initForm(){
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get errors(){
    return ErrorMesagge;
  }

  get usernames(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  private get formValue(): ILoginUser {
    const user: ILoginUser = {
      username: this.loginForm.value.username.trim().toLowerCase(),
      password: this.loginForm.value.password
    };
    return user;
  }

  inValidForm(){
    if (!this.loginForm.valid){
      return true;
    }
  }

  onSubmit(){
    this.authService.login(this.formValue).pipe(first())
            .subscribe( data => {
              this.router.navigate([this.returnUrl]);
            },
            error => {
              this.error = error;
              this.loading = false;
            });
    this.loginForm.reset();
  }

}
