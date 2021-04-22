import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/helpers';
import { Roles } from '../shared/models/roles.model';
import { LicenseDetailsComponent } from './license-details/license-details.component';
import { LicenseListComponent } from './license-list/license-list.component';
import { LicensesComponent } from './licenses.component';


const routes: Routes = [
  { path: 'licencias',
    component: LicensesComponent,
    children: [
                { path: '', component: LicenseListComponent,
                  canActivate: [AuthGuard],
                  data: { roles: [Roles.ADMIN, Roles.USER] }
                },
                { path: ':id', component: LicenseDetailsComponent,
                  canActivate: [AuthGuard],
                  data: { roles: [Roles.ADMIN, Roles.USER] }
                },
              ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicensesRoutingModule { }
