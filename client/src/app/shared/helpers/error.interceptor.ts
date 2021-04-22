import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { NotificationService } from '../services/notification.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
                private notifyService: NotificationService,
                private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([0].indexOf(err.status) !== -1) {
                const error = 'Ha ocurrido un Error en la Petición a la API';
                this.notifyService.showError('[Error: 503] - ' + error);
                return throwError(error);
            }
            if ([401, 403].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                const error = err.error.message || err.statusText;
                console.log('err.error.err.body');
                console.log(err.error.err.body);
                this.notifyService.showError('[Error: ' + err.status + '] - ' + error);
                this.authService.logout();
                this.router.navigate(['/']);
            } else {
                if (err.error.err && err.error.err.body !== 'INCORRECT_PASSWORD') {
                    this.authService.clearAttempts();
                }
                const error = err.error.message || err.statusText;
                this.notifyService.showError('[Error: ' + err.status + '] - ' + error);
                return throwError(error);
            }
        }));
    }
}
