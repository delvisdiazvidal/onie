import { Component, Input, OnInit } from '@angular/core';
import { LocationService } from 'src/app/shared/services/location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ui-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.css']
})
export class RequestItemComponent implements OnInit {

  @Input() requestItem: any;
  docUrl: string;

  constructor(private locationService: LocationService) {
    this.docUrl = environment.docsUrl;
   }

  ngOnInit() {}

  isAquacultureState(){
    return this.requestItem.requestType.licenseTypeThumbs === 'AE' ? true : false;
  }

  isAquaculturePrivate(){
    return this.requestItem.requestType.licenseTypeThumbs === 'AP' ? true : false;
  }

  isPlatformState(){
    return this.requestItem.requestType.licenseTypeThumbs === 'PE' ? true : false;
  }

  isPlatformPrivate(){
    return this.requestItem.requestType.licenseTypeThumbs === 'PP' ? true : false;
  }

  getMun(index: number){
    return this.locationService.getMunicipaliteById(index).municipaliteName;
  }

  getProv(index: number){
    return this.locationService.getProvinceById(index).provinceName;
  }

  getUrl(dir: string){
    return this.docUrl + dir;
  }

  onOpenDoc(doc: string){ }

}
