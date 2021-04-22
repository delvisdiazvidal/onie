import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { NotificationService } from '../services/notification.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private route: ActivatedRoute,
                private notifyService: NotificationService,
                private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authService.userValue;
        if (user) {
            // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(user.userRol.roleShort) === -1) {
                // role not authorised so redirect
                this.notifyService.showRedirecct('Acceso no Autorizado.', 'Su usuario no posee los privilegios necesarios para realizar esta acción.');
                this.router.navigate(['../'], {relativeTo: this.route});
                return false;
            }
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.notifyService.showRedirecct('Acceso no Autorizado.', 'Necesita iniciar sesion para este acceso.');
        this.router.navigate(['../'], {relativeTo: this.route});
        return false;
    }
}
