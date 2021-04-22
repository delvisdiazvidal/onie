import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ProfileEditComponent } from './auth/profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FisheryTypeComponent } from './core/static-nav/fishery-type/fishery-type.component';
import { CraftfishComponent } from './core/static-nav/craftfish/craftfish.component';
import { CompanyInfoComponent } from './core/static-nav/company-info/company-info.component';
import { OurInfoComponent } from './core/static-nav/our-info/our-info.component';
import { ContactsComponent } from './core/static-nav/contacts/contacts.component';
import { LawsAndDocsComponent } from './core/static-nav/laws-and-docs/laws-and-docs.component';
import { FaqComponent } from './core/static-nav/faq/faq.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { AuthGuard } from './shared/helpers';
import { Roles } from './shared/models/roles.model';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'entrar', component: SigninComponent },
  { path: 'registrarse', component: SignupComponent },
  { path: 'tipos-de-pesca', component: FisheryTypeComponent },
  { path: 'artes-de-pesca', component: CraftfishComponent },
  { path: 'info-para-empresas', component: CompanyInfoComponent },
  { path: 'nosotros', component: OurInfoComponent },
  { path: 'leyes-y-resoluciones', component: LawsAndDocsComponent },
  { path: 'contactenos', component: ContactsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'perfil', component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.ADMIN, Roles.USER] }
  },
  { path: 'editar-perfil', component: ProfileEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.ADMIN, Roles.USER] }
  },
  { path: 'contraseña', component: ChangePasswordComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.ADMIN, Roles.USER] }
  },
  { path: 'usuarios', loadChildren: () => import( './users/users.module' ).then(m => m.UsersModule),
    canActivate: [AuthGuard],
    data: { roles: [Roles.ADMIN] }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
