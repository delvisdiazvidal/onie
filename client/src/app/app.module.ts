import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { registerLocaleData } from '@angular/common';
import localesEs from '@angular/common/locales/es';

registerLocaleData(localesEs, 'es');

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ErrorComponent } from './error/error.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { LicensesModule } from './licenses/licenses.module';
import { InfractorsModule } from './infractors/infractors.module';
import { RequestsModule } from './requests/requests.module';



@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
    RequestsModule,
    LicensesModule,
    InfractorsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'es'}
  ]
})
export class AppModule { }

