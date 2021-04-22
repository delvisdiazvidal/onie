import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { IUser, IUserPass, User } from 'src/app/shared/models/user.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/shared/models/response.interface';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Observable<User[]>;
  private API_URL: string;
  private $userChange: BehaviorSubject<User[]>;
  private dataStore: { users: User[] };
  $userEditing: Subject<number>;

  constructor(private http: HttpClient,
              private notifyService: NotificationService) {
    this.API_URL = environment.userUrl;
    this.dataStore = { users: [] };
    this.$userChange = new BehaviorSubject([]);
    this.$userEditing = new Subject();
    this.users = this.$userChange.asObservable();
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private refresh() {
    this.$userChange.next(Object.assign({}, this.dataStore).users);
  }

  public fetchUsers() {
    return this.http.get<IResponse>(this.API_URL)
                    .subscribe(( res: IResponse ) =>  {
                      this.dataStore.users = res.result;
                      this.refresh();
                    });
  }

  public getUsers(): Observable<User[]> {
    return this.$userChange.asObservable();
  }

  public getUsersItem(index: number)  {
    return this.dataStore.users.find( element => element.userCode === index );
  }

  public isUsedUser(username: string): Observable<boolean>{
    return this.http.get<boolean>(`${environment.userUrl}/valid/${username}`, this.httpOptions);
  }

  public addUser(addValue: IUser) {
    return this.http.post<IResponse>(`${environment.userUrl}`, { addValue }, this.httpOptions)
                    .pipe( catchError(this.handleError) )
                    .subscribe(( res: IResponse ) =>  {
                      this.fetchUsers();
                      this.notifyService.showSuccess(res.message);
                    });
  }

  public editUser(editValue: IUser) {
    return this.http.put<IResponse>(`${environment.userUrl}/${editValue.userCode}`, { editValue }, this.httpOptions)
                    .pipe( catchError(this.handleError) )
                    .subscribe(( res: IResponse ) =>  {
                      this.fetchUsers();
                      this.notifyService.showSuccess(res.message);
                    });
  }

  public changePassword(passValue: IUserPass) {
    return this.http.put<IResponse>(`${environment.userUrl}/change/${passValue.userCode}`, { passValue })
                    .subscribe(( res: IResponse ) =>  {
                      const user: IUser = res.result;
                      this.refresh();
                      this.notifyService.showSuccess(res.message);
                    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ha ocurrido un error:', error.error.message);
    } else {
      console.error(  `Retorno del Backend, codigo ${error.status}, ` +
                      `body was: ${error.error}`);
    }
    return throwError('Algo ha ocurrido; pruebe mas tarde.');
  }

}
