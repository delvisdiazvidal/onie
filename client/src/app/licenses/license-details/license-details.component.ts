import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { IResponse } from 'src/app/shared/models/response.interface';
import { LocationService } from 'src/app/shared/services/location.service';
import { LicenseService } from '../shared/license.service';

@Component({
  selector: 'ui-license-details',
  templateUrl: './license-details.component.html',
  styleUrls: ['./license-details.component.css']
})
export class LicenseDetailsComponent implements OnInit, OnDestroy {

  licenseDetails: any;
  licenseIndex: number;
  indexSubscription: Subscription;
  licenseSubscription: Subscription;
  licenseType: any;

  constructor(private licenseService: LicenseService,
              private locationService: LocationService,
              private route: ActivatedRoute,
              private router: Router) {
              }

  ngOnInit() {
    this.indexSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.licenseIndex = +params.id;
          this.licenseType = this.licenseService.getLicenseItemType(this.licenseIndex);
        }
      );
    this.licenseSubscription = this.licenseService.getLicenseById(this.licenseIndex)
      .subscribe( (res: IResponse) => {
            this.licenseDetails = res.result;
      });
  }

  getMun(index: number){
    return this.locationService.getMunicipaliteById(index).municipaliteName;
  }

  getProv(index: number){
    return this.locationService.getProvinceById(index).provinceName;
  }

  isAquacultureState(){
    return this.licenseType.licenseTypeThumbs === 'AE' ? true : false;
  }

  isAquaculturePrivate(){
    return this.licenseType.licenseTypeThumbs === 'AP' ? true : false;
  }

  isPlatformState(){
    return this.licenseType.licenseTypeThumbs === 'PE' ? true : false;
  }

  isPlatformPrivate(){
    return this.licenseType.licenseTypeThumbs === 'PP' ? true : false;
  }

 /* isPlatformPrivate(){
    return this.license.licenseThumbs === 'PP' ? true : false;
  }

  isPlatformState(){
    return this.license.licenseThumbs === 'PE' ? true : false;
  } */

  ngOnDestroy() {
    this.indexSubscription.unsubscribe();
    this.licenseSubscription.unsubscribe();
  }

}
