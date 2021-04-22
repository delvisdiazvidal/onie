import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestAquaculturePrivateComponent } from './request-aquaculture-private/request-aquaculture-private.component';
import { RequestAquacultureStateComponent } from './request-aquaculture-state/request-aquaculture-state.component';
import { RequestAddComponent } from './request-add/request-add.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestReviewComponent } from './request-review/request-review.component';
import { RequestPlatformStateComponent } from './request-platform-state/request-platform-state.component';
import { RequestPlatformPrivateComponent } from './request-platform-private/request-platform-private.component';
import { PersonFormComponent } from './shared/forms/person-form/person-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DocsFormComponent } from './shared/forms/docs-form/docs-form.component';
import { RequestInspectionComponent } from './request-inspection/request-inspection.component';
import { RequestItemComponent } from './request-item/request-item.component';
import { CompanyFormComponent } from './shared/forms/company-form/company-form.component';
import { ReservoirFormComponent } from './shared/forms/reservoir-form/reservoir-form.component';
import { ShipListFormComponent } from './shared/forms/ship-list-form/ship-list-form.component';
import { ShipFormComponent } from './shared/forms/ship-form/ship-form.component';


@NgModule({
  declarations: [
    RequestsComponent,
    RequestListComponent,
    RequestAquaculturePrivateComponent,
    RequestAquacultureStateComponent,
    RequestAddComponent,
    RequestDetailsComponent,
    RequestReviewComponent,
    RequestPlatformStateComponent,
    RequestPlatformPrivateComponent,
    PersonFormComponent,
    DocsFormComponent,
    RequestInspectionComponent,
    RequestItemComponent,
    CompanyFormComponent,
    ReservoirFormComponent,
    ShipListFormComponent,
    ShipFormComponent,
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class RequestsModule { }
