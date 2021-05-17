import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';
import { ILoginUser, ISignUpUser, IProfileUser, IUser, ILoginFails } from 'src/app/shared/models/user.model';
import { IResponse } from 'src/app/shared/models/response.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Roles } from 'src/app/shared/models/roles.model';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;
  returnUrl: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notifyService: NotificationService,
              private dialog: ConfirmDialogService,
              private http: HttpClient) {
        this.userSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('userData')));
        this.currentUser = this.userSubject.asObservable();
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private refresh(user: IUser){
      localStorage.setItem('userData', JSON.stringify(user));
      this.userSubject.next(user);
  }

  public get userValue(): IUser {
      return this.userSubject.value;
  }

  public notLoggedIn(): boolean{
    return this.userSubject.value == null;
  }

  public isLoggedIn(): boolean{
    return this.userSubject.value != null;
  }

  public get userRol(): string{
    return this.userSubject.value ? this.userSubject.value.userRol.roleShort : null;
  }

  public get isAdmin(): boolean{
    return (this.userSubject.value && (this.userSubject.value.userRol.roleShort === Roles.ADMIN)) ? true : false;
  }

  public isAdvanced(): boolean{
    return (this.userSubject.value && (this.userSubject.value.userRol.roleShort === Roles.ADVANCED)) ? true : false;
  }

  public isUser(): boolean{
    return (this.userSubject.value && (this.userSubject.value.userRol.roleShort === Roles.USER)) ? true : false;
  }

  public isValidPassword(password: string): Observable<boolean>{
    return this.http.get<boolean>(`${environment.authUrl}/${password}`, this.httpOptions);
  }

  public isUsedPassword(password: string): Observable<boolean>{
    return this.http.get<boolean>(`${environment.authUrl}/history/${password}`, this.httpOptions);
  }

  public expiredPassword(expiredAt: Date): any{
    const currentDay = new Date(Date.now());
    const expMoment = moment(expiredAt);
    const leftDays = expMoment.diff(currentDay, 'days');
    if (leftDays <= environment.EXP_PASS) {
      this.dialog.expired(leftDays)
          .then((confirmed) => confirmed ? this.router.navigate(['/contraseña']) : false )
          .catch(() => false);
    }
  }

  public maxAttempts(username: string): any{
    const fails: ILoginFails = JSON.parse(localStorage.getItem('fails'));
    if (fails && (fails.username === username)) {
      if (fails.attempts <= 2) {
        this.disabledUser(fails.username);
      } else {
        fails.attempts--;
        localStorage.setItem('fails', JSON.stringify(fails));
      }
    } else {
      this.clearAttempts();
      const newFails: ILoginFails = { username, attempts: environment.MAX_ATTEMPTS };
      localStorage.setItem('fails', JSON.stringify(newFails));
    }
  }

  public clearAttempts(){
    localStorage.removeItem('fails');
  }

  public login(logInValue: ILoginUser) {
    this.maxAttempts(logInValue.username);
    return this.http.post<IResponse>(environment.authUrl, { logInValue })
        .pipe( map ( res => {
            console.log('Service');
            const user: IUser = res.result;
            this.refresh(user);
            this.expiredPassword(user.expiredAt);
        }));
  }

  public signUp(signUpValue: ISignUpUser) {
    return this.http.post<IResponse>(environment.userUrl, { signUpValue })
                    .subscribe(( res: IResponse ) =>  {
                      this.notifyService.showSigUpInfo(res.message, 'Ahora puede acceder al sistema.');
                      this.router.navigate(['/entrar']);
                    });
  }

  public editProfile(editValue: IUser) {
    return this.http.put<IResponse>(`${environment.userUrl}/profile/${editValue.userCode}`, { editValue })
                    .subscribe(( res: IResponse ) =>  {
                      const user: IUser = res.result;
                      this.refresh(user);
                      this.notifyService.showSuccess(res.message);

                    });
  }

  public changePassword(passValue: IProfileUser) {
    return this.http.put<IResponse>(`${environment.userUrl}/change/${this.userValue.userCode}`, { passValue })
                    .subscribe(( res: IResponse ) =>  {
                      const user: IUser = res.result;
                      this.refresh(user);
                      this.notifyService.showSuccess(res.message);
                      this.logout();
                    });
  }

  public disabledUser(username: string) {
    return this.http.put<IResponse>(`${environment.authUrl}/disabled`, { username })
                    .subscribe(( res: IResponse ) =>  {
                      console.log(res);
                    });
  }

  public clearUserData(){
    localStorage.removeItem('userData');
  }

  public logout() {
      this.clearUserData();
      this.clearAttempts();
      this.userSubject.next(null);
      this.notifyService.showInfo('Se ha cerrado la sesión correctamente');
      this.router.navigate(['/entrar']);
  }

}
