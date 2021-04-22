import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/helpers';
import { Roles } from '../shared/models/roles.model';
import { InfractorAddComponent } from './infractor-add/infractor-add.component';
import { InfractorDetailsComponent } from './infractor-details/infractor-details.component';
import { InfractorSearchComponent } from './infractor-search/infractor-search.component';
import { InfractorsComponent } from './infractors.component';


const routes: Routes = [
  { path: 'infractores',
    component: InfractorsComponent,
    children: [
                { path: '', component: InfractorSearchComponent,
                  canActivate: [AuthGuard],
                  data: { roles: [Roles.ADMIN, Roles.USER] }
                },
                { path: 'adicionar-infraccion', component: InfractorAddComponent,
                  canActivate: [AuthGuard],
                  data: { roles: [Roles.ADMIN, Roles.USER] }
                },
                { path: ':id', component: InfractorDetailsComponent,
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
export class InfractorsRoutingModule { }
