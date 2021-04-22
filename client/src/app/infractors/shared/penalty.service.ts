import { Injectable } from '@angular/core';
import { IPenalty } from './infractor.model';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { IResponse } from './../../shared/models/response.interface';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/notification.service';
import errorMessage from './../../../../../backend/src/config/errors';

@Injectable({
  providedIn: 'root'
})
export class PenaltyService {

  private penaltyUrl: string;
  penalty: Observable<IPenalty[]>;
  private $penaltyChange: BehaviorSubject<IPenalty[]>;
  private dataStore: {
    penaltys: IPenalty[],
   };

  constructor(private http: HttpClient,
              private notifyService: NotificationService) {
        this.penaltyUrl = environment.penaltyUrl;
        this.dataStore = { penaltys: [] };
        this.$penaltyChange = new BehaviorSubject([]);
        this.penalty = this.$penaltyChange.asObservable();
      }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private refreshPenalty() {
    this.$penaltyChange.next(Object.assign({}, this.dataStore).penaltys);
  }

  public fetchPenalty() {
    return this.http.get<IResponse>(this.penaltyUrl)
                    .pipe( retry(3) )
                    .subscribe(( res: IResponse ) =>  {
                      this.dataStore.penaltys = res.result;
                      this.refreshPenalty();
                    });
  }

  public getPenaltys(): Observable<IPenalty[]> {
    return this.$penaltyChange.asObservable();
  }

  public getPenaltyStoreItem(index: number)  {
    return this.dataStore.penaltys.find( element => element.penaltyCode === index );
  }

  public getPenaltyApiItem(index: number)  {
    return this.http.get<IResponse>(`${this.penaltyUrl}/${index}`)
                    .pipe( retry(3));
  }

  public addPenalty(penalty: IPenalty) {
    return this.http.post<IResponse>(`${this.penaltyUrl}`, { penalty })
                .subscribe( (res: IResponse) => {
                  this.dataStore.penaltys.push(res.result);
                  this.fetchPenalty();
                  this.notifyService.showSuccess(res.message);
                });
  }

  public getOffenderByCI(offenderCI: string)  {
    return this.http.get<IResponse>(`${this.penaltyUrl}/offender/${offenderCI}`)
                    .pipe( retry(3) );
  }


}
