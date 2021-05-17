import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from '../shared/helpers';


const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'registrarse', component: SignupComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'editar-perfil', component: ProfileEditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
