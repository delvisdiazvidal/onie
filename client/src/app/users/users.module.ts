import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersAddComponent,
    UsersDetailsComponent,
    UsersEditComponent,
    UsersFormComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UsersModule { }
