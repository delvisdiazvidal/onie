import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/helpers';
import { Roles } from '../shared/models/roles.model';

import { UsersComponent } from './users.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { ChangePasswordComponent } from '../users/change-password/change-password.component';


const routes: Routes = [
  { path: '', component: UsersComponent,
              canActivate: [AuthGuard],
              data: { roles: [Roles.ADMIN] },
              children: [
                          { path: '', component: UsersAddComponent,
                            canActivate: [AuthGuard],
                            data: { roles: [Roles.ADMIN] }
                          },
                          { path: 'nuevo', component: UsersAddComponent,
                            canActivate: [AuthGuard],
                            data: { roles: [Roles.ADMIN] }
                          },
                          { path: ':id', component: UsersDetailsComponent,
                            canActivate: [AuthGuard],
                            data: { roles: [Roles.ADMIN] }
                          },
                          { path: ':id/editar', component: UsersEditComponent,
                            canActivate: [AuthGuard],
                            data: { roles: [Roles.ADMIN] }
                          },
                          { path: ':id/restablecer-contraseña', component: ChangePasswordComponent,
                            canActivate: [AuthGuard],
                            data: { roles: [Roles.ADMIN] }
                          },
                        ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
