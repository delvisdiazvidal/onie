import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LicensesRoutingModule } from './licenses-routing.module';
import { LicensesComponent } from './licenses.component';
import { LicenseListComponent } from './license-list/license-list.component';
import { LicenseService } from './shared/license.service';
import { LicenseDetailsComponent } from './license-details/license-details.component';


@NgModule({
  declarations: [
    LicensesComponent,
    LicenseListComponent,
    LicenseDetailsComponent,
  ],
  imports: [
    CommonModule,
    LicensesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DatePipe, LicenseService]
})
export class LicensesModule { }
