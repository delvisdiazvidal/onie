import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IRequest, IRequestStatus, RequestStatus } from '../models/request.model';
import { LicenseThumbs, LicenseType } from 'src/app/licenses/shared/models/license.model';
import { RequestAquacultureState } from '../models/request-aquaculture-state.model';
import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/shared/models/response.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { RequestAquaculturePrivate } from '../models/request-aquaculture-private.model';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/shared/services/location.service';
import { IUser } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Roles } from 'src/app/shared/models/roles.model';
import { PenaltyService } from 'src/app/infractors/shared/penalty.service';
import { catchError, retry } from 'rxjs/operators';
import { RequestPlatformPrivate } from '../models/request-platform.model';
import { RequestPlatformState } from '../models/request-platform-state.model';
import { IAquacultureRequestDocs, IRequestDocs } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requestUrl: string;
  private requestAPUrl: string;
  private requestASUrl: string;
  private requestPPUrl: string;
  private requestPSUrl: string;
  request: Observable<IRequest[]>;
  private $requestChange: BehaviorSubject<IRequest[]>;
  private dataStore: {
    requests: IRequest[],
   };
  currentUser: IUser;

  constructor(private router: Router,
              private http: HttpClient,
              private authService: AuthService,
              private penaltyService: PenaltyService,
              private locationService: LocationService,
              private notifyService: NotificationService) {
    this.requestUrl = environment.requestUrl;
    this.requestAPUrl = environment.requestAPUrl;
    this.requestASUrl = environment.requestASUrl;
    this.requestPPUrl = environment.requestPPUrl;
    this.requestPSUrl = environment.requestPSUrl;
    this.dataStore = {
      requests: [],
    };
    this.$requestChange = new BehaviorSubject([]);
    this.request = this.$requestChange.asObservable();
    if (this.authService.currentUser){
      this.authService.currentUser
        .subscribe( user => this.currentUser = user);
    }
  }

  private refreshRequest() {
    this.$requestChange.next(Object.assign({}, this.dataStore).requests);
  }

  public fetchRequest() {
    return this.http.get<IResponse>(this.requestUrl)
                    .subscribe(( res: IResponse ) =>  {
                      this.dataStore.requests = res.result;
                      this.refreshRequest();
                    });
  }

  public getRequests(): Observable<IRequest[]> {
    return this.$requestChange.asObservable();
  }

  public createRequestOrderNumber(personProvince: number, licenseTypeThumbs: string){
    const date = Date.now();
    const provinceAB = this.locationService.getProvinceById(personProvince).provinceAB;
    return licenseTypeThumbs + provinceAB + date;
  }

  public addAquaculturePrivate(newRequest: RequestAquaculturePrivate){

      this.penaltyService.getOffenderByCI(newRequest.requestPerson.personCI)
        .subscribe( (response: IResponse) => {
              if (response.result){
                const offender = response.result;
                this.notifyService.showError('Atención!!! Usted está penalizado. No puede realizar una Solicitud');
                this.router.navigate(['infractores/' + offender.penaltyCode]);
              } else {
              return this.http.post<IResponse>(this.requestAPUrl, { newRequest })
                .subscribe( (res: IResponse) => {
                      const requestCode = res.result;
                      this.addRequestFiles(requestCode, newRequest);
                      this.notifyService.showSuccess(res.message);
                      this.router.navigate(['solicitudes/' + requestCode]);
                  });
              }
         });
  }

  public addAquacultureState(newRequest: RequestAquacultureState){

    this.penaltyService.getOffenderByCI(newRequest.requestPerson.personCI)
      .subscribe( (response: IResponse) => {
            if (response.result){
              const offender = response.result;
              this.notifyService.showError('Atención!!! Usted está penalizado. No puede realizar una Solicitud');
              this.router.navigate(['infractores/' + offender.penaltyCode]);
            } else {
            return this.http.post<IResponse>(this.requestASUrl, { newRequest })
              .subscribe( (res: IResponse) => {
                    const requestCode = res.result;
                    this.addAquacultureRequestFiles(requestCode, newRequest);
                    this.notifyService.showSuccess(res.message);
                    this.router.navigate(['solicitudes/' + requestCode]);
                });
            }
      });
  }

  public addPlatformPrivate(newRequest: RequestPlatformPrivate){

    this.penaltyService.getOffenderByCI(newRequest.requestPerson.personCI)
      .subscribe( (response: IResponse) => {
            if (response.result){
              const offender = response.result;
              this.notifyService.showError('Atención!!! Usted está penalizado. No puede realizar una Solicitud');
              this.router.navigate(['infractores/' + offender.offenderCI]);
            } else {
            return this.http.post<IResponse>(this.requestPPUrl, { newRequest })
              .subscribe( (res: IResponse) => {
                  const requestCode = res.result;
                  this.addRequestFiles(requestCode, newRequest);
                  this.notifyService.showSuccess(res.message);
                  this.router.navigate(['solicitudes/' + requestCode]);
              });
            }
      });
  }

  public addPlatformState(newRequest: RequestPlatformState){

    this.penaltyService.getOffenderByCI(newRequest.requestPerson.personCI)
      .subscribe( (response: IResponse) => {
            if (response.result){
              const offender = response.result;
              this.notifyService.showError('Atención!!! Usted está penalizado. No puede realizar una Solicitud');
              this.router.navigate(['infractores/' + offender.penaltyCode]);
            } else {
            return this.http.post<IResponse>(this.requestPSUrl, { newRequest })
              .subscribe( (res: IResponse) => {
                  const requestCode = res.result;
                  this.addRequestFiles(requestCode, newRequest);
                  this.notifyService.showSuccess(res.message);
                  this.router.navigate(['solicitudes/' + requestCode]);
              });
            }
      });
  }

  public addRequestFiles(requestCode: number, newRequest: any){
    if (requestCode && newRequest) {
        const fd = new FormData();
        fd.append('requestCode',  requestCode.toString());
        fd.append('fileToUpload', newRequest.requestNotTaxDebt, newRequest.requestNotTaxDebt.name);
        fd.append('fileToUpload', newRequest.requestTaxAboutShipProperty, newRequest.requestTaxAboutShipProperty.name);
        fd.append('fileToUpload', newRequest.requestCertificateOfNavigability, newRequest.requestCertificateOfNavigability.name);
        fd.append('fileToUpload', newRequest.requestBoatRegistrationCertificate, newRequest.requestBoatRegistrationCertificate.name);
        fd.append('contractNumber',  newRequest.requestContractNumber);
        fd.append('fileToUpload', newRequest.requestContract, newRequest.requestContract.name);

        return this.http.post<IResponse>(`${this.requestUrl}/add-files`, fd)
                        .subscribe( (res: IResponse) => {
                            this.notifyService.showSuccess(res.message);
                          });
    }
  }

  public addAquacultureRequestFiles(requestCode: number, newRequest: any){
      if (requestCode && newRequest) {
        const fd = new FormData();
        fd.append('requestCode',  requestCode.toString());
        fd.append('fileToUpload', newRequest.requestNotTaxDebt, newRequest.requestNotTaxDebt.name);
        fd.append('fileToUpload', newRequest.requestTaxAboutShipProperty, newRequest.requestTaxAboutShipProperty.name);
        fd.append('fileToUpload', newRequest.requestCertificateOfNavigability, newRequest.requestCertificateOfNavigability.name);
        fd.append('fileToUpload', newRequest.requestBoatRegistrationCertificate, newRequest.requestBoatRegistrationCertificate.name);
        fd.append('fileToUpload', newRequest.requestIRHCertificate, newRequest.requestIRHCertificate.name);

        return this.http.post<IResponse>(`${this.requestUrl}/add-aqua-files`, fd)
                        .subscribe( (res: IResponse) => {
                            this.notifyService.showSuccess(res.message);
                          });
    }
  }

  public getRequestByOrderNumber(requestOrderNumber: string): Observable<any>{
    return this.http.get<IResponse>(`${this.requestUrl}/search-order/${requestOrderNumber}`)
                          .pipe( retry(3), catchError(this.handleError) );
  }

  public getRequestsByPersonCI(personCI: string): Observable<any>{
    return this.http.get<IResponse>(`${this.requestUrl}/search-id/${personCI}`)
                          .pipe( retry(3), catchError(this.handleError) );
  }

  public getRequestApiItem(requestCode: number): Observable<any>{
    return this.http.get<IResponse>(`${this.requestUrl}/${requestCode}`)
                          .pipe( retry(3), catchError(this.handleError) );
  }

  public getRequestStoreItem(requestCode: number)  {
    return this.dataStore.requests.find( element => element.requestCode === requestCode );
  }

  public getRequestByLicense(request: IRequest): Observable<any>  {

    switch (request.requestType.licenseTypeThumbs) {
      case LicenseThumbs.AquaculturePrivate:
        return this.http.get<IResponse>(`${this.requestAPUrl}/${request.requestCode}`);
      case LicenseThumbs.AquacultureState:
        return this.http.get<IResponse>(`${this.requestASUrl}/${request.requestCode}`);
      case LicenseThumbs.PlatformPrivate:
        return this.http.get<IResponse>(`${this.requestPPUrl}/${request.requestCode}`);
      case LicenseThumbs.PlatformState:
        return this.http.get<IResponse>(`${this.requestPSUrl}/${request.requestCode}`);
      default:
          return null;
      }
  }

  public deniedRequest(value: any){
    const request: IRequest = this.dataStore.requests.find( element => element.requestCode === Number(value.requestIndex));

    if (!request) {
      this.notifyService.showError('Solicitud Inexistente');
      this.router.navigate(['/solicitudes/todas']);
    } else {

      const requestStatus = {
          requestCode: request.requestCode,
          requestOrderNumber: request.requestOrderNumber,
          requestStatusName: RequestStatus.Denegada,
          requestUser: this.currentUser.userCode,
          requestObservation: value.formValue.obserInspection
      };

      return this.http.post<IResponse>(this.requestUrl, { requestStatus })
        .subscribe( (res: IResponse) => {
            this.notifyService.showError(res.message);
            this.fetchRequest();
            this.router.navigate(['solicitudes/todas']);
          });
    }
  }

  public aprovedRequest(value: any){
    const request: IRequest = this.dataStore.requests.find( element => element.requestCode === Number(value.requestIndex));

    if (!request) {
      this.notifyService.showError('Solicitud Inexistente');
      this.router.navigate(['/solicitudes/todas']);
    } else {

      const requestStatus = {
          requestCode: request.requestCode,
          requestOrderNumber: request.requestOrderNumber,
          requestStatusName: RequestStatus.Verificada,
          requestUser: this.currentUser.userCode,
          requestObservation: value.formValue.obserInspection
      };

      return this.http.post<IResponse>(this.requestUrl, { requestStatus })
        .subscribe( (res: IResponse) => {
            this.notifyService.showSuccess(res.message);
            this.fetchRequest();
            this.router.navigate(['solicitudes/todas']);
          });
    }
  }

  public aceptedRequest(value: any){
    const request: IRequest = this.dataStore.requests.find( element => element.requestCode === Number(value.requestItem.requestCode));
    if (!request) {
      this.notifyService.showError('Solicitud Inexistente');
      this.router.navigate(['/solicitudes/todas']);
    } else {
      const requestStatus = {
          requestCode: request.requestCode,
          requestOrderNumber: request.requestOrderNumber,
          requestStatusName: RequestStatus.Aprobada,
          requestUser: this.currentUser.userCode,
          licenseIdentificator: value.formValue.licenseIdentificator,
          licenseAmount: value.formValue.licenseAmount,
          requestObservation: value.formValue.obserInspection,
          requestItem: value.requestItem
      };

      return this.http.post<IResponse>(this.requestUrl, { requestStatus })
        .subscribe( (res: IResponse) => {
            this.notifyService.showSuccess(res.message);
            this.fetchRequest();
            this.router.navigate(['solicitudes/todas']);
            this.notifyService.showInfo('En breve estará lista la Licencia de Pesca Digital');
          });
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ha ocurrido un error:', error.error.message);
    } else {
      console.error(  `Retorno del Backend, código ${error.status}, ` +
                      `Respuesta: ${error.error.message}`);
    }
    return throwError('Algo ha ocurrido; pruebe mas tarde.');
  }

}
