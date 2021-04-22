import { Component, OnInit } from '@angular/core';
import { IMunicipalite, Province } from './shared/models/locations.model';
import { LocationService } from './shared/services/location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  provinces: Province[];
  municipalites: IMunicipalite[];
  APP_VERSION: string;
  INC_NAME: string;
  currentYear: number;

  constructor(private locationService: LocationService) {
    this.locationService.fetchMunicipalites();
    this.locationService.fetchProvinces();
    this.APP_VERSION = environment.APP_VERSION;
    this.INC_NAME = environment.INC_NAME;
    const today = new Date();
    this.currentYear = today.getFullYear();
  }

  ngOnInit() {}

}
