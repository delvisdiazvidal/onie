import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    user: User;

    constructor(private authService: AuthService) {
        this.user = this.authService.userValue;
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        this.user = this.authService.userValue;
        const isLoggedIn = this.user && this.user.userToken;
        const isApiUrl = request.url.startsWith(environment.baseUrl);
        // response.headers()
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    authjwtoken: this.user.userToken
                }
            });
        }
        return next.handle(request);
    }
}
