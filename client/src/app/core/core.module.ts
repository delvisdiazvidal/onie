import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing.module';
import { NgbModule, NgbCollapseModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { BaseURLInterceptor, ErrorInterceptor, AuthGuard, JwtInterceptor } from '../shared/helpers';
import { HeaderComponent } from './header/header.component';
import { HeaderAdminComponent } from './header/header-admin/header-admin.component';
import { HeaderAdvancedComponent } from './header/header-advanced/header-advanced.component';
import { HomeComponent } from './home/home.component';
import { NotificationService } from '../shared/services/notification.service';
import { ConfirmDialogService } from '../shared/services/confirm-dialog.service';
import { AuthService } from '../auth/shared/auth.service';
import { HeaderFrontComponent } from './header/header-front/header-front.component';
import { CraftfishComponent } from './static-nav/craftfish/craftfish.component';
import { FisheryTypeComponent } from './static-nav/fishery-type/fishery-type.component';
import { CompanyInfoComponent } from './static-nav/company-info/company-info.component';
import { OurInfoComponent } from './static-nav/our-info/our-info.component';
import { ContactsComponent } from './static-nav/contacts/contacts.component';
import { HeaderUserComponent } from './header/header-user/header-user.component';
import { LawsAndDocsComponent } from './static-nav/laws-and-docs/laws-and-docs.component';
import { FaqComponent } from './static-nav/faq/faq.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    HeaderAdminComponent,
    HeaderAdvancedComponent,
    HeaderFrontComponent,
    CraftfishComponent,
    FisheryTypeComponent,
    CompanyInfoComponent,
    OurInfoComponent,
    ContactsComponent,
    HeaderUserComponent,
    LawsAndDocsComponent,
    FaqComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule,
    NgbCollapseModule,
    NgbAccordionModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    ToastrService,
    NotificationService,
    ConfirmDialogService,
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: BaseURLInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
})
export class CoreModule { }
