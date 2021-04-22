import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { IUser, User } from 'src/app/shared/models/user.model';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'ui-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'row';
  public editForm: FormGroup;
  public user: User;
  supscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router) {
    this.supscription = this.authService.currentUser
        .subscribe( user => this.user = user);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.editForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      personDir: new FormControl(this.user.personDir, Validators.required),
    });
  }

  private get formValue(): IUser {
    this.editForm.value.firstName = this.editForm.value.firstName.trim();
    this.editForm.value.lastName = this.editForm.value.lastName.trim();
    this.editForm.value.personDir = this.editForm.value.personDir.trim();
    return this.editForm.value;
  }

  onSubmit(){
    console.log(this.formValue);
    
    this.authService.editProfile(this.formValue);
  }

  onCancel(){
    this.editForm.reset();
    this.router.navigate(['/perfil']);
  }

  ngOnDestroy(){
    this.supscription.unsubscribe();
  }

}
