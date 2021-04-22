import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfractorsRoutingModule } from './infractors-routing.module';
import { InfractorsComponent } from './infractors.component';
import { InfractorListComponent } from './infractor-list/infractor-list.component';
import { InfractorDetailsComponent } from './infractor-details/infractor-details.component';
import { InfractorAddComponent } from './infractor-add/infractor-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfractorSearchComponent } from './infractor-search/infractor-search.component';


@NgModule({
  declarations: [
    InfractorsComponent,
    InfractorListComponent,
    InfractorDetailsComponent,
    InfractorAddComponent,
    InfractorSearchComponent
  ],
  imports: [
    CommonModule,
    InfractorsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InfractorsModule { }
