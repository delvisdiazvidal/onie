import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/helpers';
import { Roles } from '../shared/models/roles.model';
import { RequestAddComponent } from './request-add/request-add.component';
import { RequestAquaculturePrivateComponent } from './request-aquaculture-private/request-aquaculture-private.component';
import { RequestAquacultureStateComponent } from './request-aquaculture-state/request-aquaculture-state.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestInspectionComponent } from './request-inspection/request-inspection.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestPlatformPrivateComponent } from './request-platform-private/request-platform-private.component';
import { RequestPlatformStateComponent } from './request-platform-state/request-platform-state.component';
import { RequestReviewComponent } from './request-review/request-review.component';
import { RequestsComponent } from './requests.component';


const routes: Routes = [
  { path: 'solicitudes', redirectTo: 'solicitudes/todas', pathMatch: 'full'},
  { path: 'solicitudes',
    component: RequestsComponent,
    children: [
                { path: 'todas', component: RequestListComponent ,
                  canActivate: [AuthGuard],
                  data: { roles: [Roles.ADMIN, Roles.USER] }
                },
                { path: 'nueva-solicitud', component: RequestAddComponent },
                { path: 'solicitud-licencia-acuicola-estatal', component: RequestAquacultureStateComponent },
                { path: 'solicitud-licencia-acuicola-no-estatal', component: RequestAquaculturePrivateComponent },
                { path: 'solicitud-licencia-plataforma-estatal', component: RequestPlatformStateComponent },
                { path: 'solicitud-licencia-plataforma-no-estatal', component: RequestPlatformPrivateComponent },
                { path: ':id', component: RequestDetailsComponent },
                { path: ':id/verificar', component: RequestReviewComponent,
                  canActivate: [AuthGuard],
                  data: { roles: [Roles.ADMIN, Roles.USER] }
                },
                { path: ':id/confirmar', component: RequestInspectionComponent,
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
export class RequestsRoutingModule { }
