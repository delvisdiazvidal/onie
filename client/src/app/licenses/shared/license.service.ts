import { DatePipe } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ILicense,  } from './models/license.model';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { LocationService } from './../../shared/services/location.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/shared/models/response.interface';
import { LicenseThumbs } from 'src/app/licenses/shared/models/license.model';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  private licenseUrl: string;
  private licenseAPUrl: string;
  private licenseASUrl: string;
  private licensePPUrl: string;
  private licensePSUrl: string;
  license: Observable<ILicense[]>;
  private $licenseChange: BehaviorSubject<ILicense[]>;
  private dataStore: {
    licenses: ILicense[],
   };

   constructor( private router: Router,
                private http: HttpClient,
                private authService: AuthService,
                private locationService: LocationService,
                private notifyService: NotificationService) {

        this.licenseUrl = environment.licenseUrl;
        this.licenseAPUrl = environment.licenseAPUrl;
        this.licenseASUrl = environment.licenseASUrl;
        this.licensePPUrl = environment.licensePPUrl;
        this.licensePSUrl = environment.licensePSUrl;
        this.dataStore = {
          licenses: [],
        };
        this.$licenseChange = new BehaviorSubject([]);
        this.license = this.$licenseChange.asObservable();
      }

  private refreshLicense() {
    this.$licenseChange.next(Object.assign({}, this.dataStore).licenses);
  }

  public fetchLicense() {
    return this.http.get<IResponse>(this.licenseUrl)
                    .subscribe(( res: IResponse ) =>  {
                      this.dataStore.licenses = res.result;
                      this.refreshLicense();
                    });
  }

  public getLicenses(): Observable<ILicense[]> {
    return this.$licenseChange.asObservable();
  }

  public getLicenseItem(index: number)  {
    return this.dataStore.licenses.find( element => element.licenseCode === index );
  }

  public getLicenseItemType(index: number)  {
    const licenseItem = this.dataStore.licenses.find( element => element.licenseCode === index );
    return licenseItem.licenseType;
  }

  public getLicenseById(licenseCode: number): Observable<any>  {
    const license: any = this.dataStore.licenses.find( element => element.licenseCode === Number(licenseCode));

    if (!license) {
      this.notifyService.showError('Licencia Inexistente');
      this.router.navigate(['/licencias']);
    } else {
      switch (license.licenseType.licenseTypeThumbs) {
        case LicenseThumbs.AquacultureState:
          return this.http.get<IResponse>(`${this.licenseASUrl}/${licenseCode}`);
        case LicenseThumbs.AquaculturePrivate:
          return this.http.get<IResponse>(`${this.licenseAPUrl}/${licenseCode}`);
        case LicenseThumbs.PlatformPrivate:
          return this.http.get<IResponse>(`${this.licensePPUrl}/${licenseCode}`);
        case LicenseThumbs.PlatformState:
          return this.http.get<IResponse>(`${this.licensePSUrl}/${licenseCode}`);
        default:
            return license;
        }
      }
  }

}
