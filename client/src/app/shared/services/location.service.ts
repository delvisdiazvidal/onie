import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IMunicipalite, IProvince } from '../models/locations.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../models/response.interface';
import { Province } from './../models/locations.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private MUNICIPALITE_URL: string;
  private PROVINCE_URL: string;
  municipalites: Observable<IMunicipalite[]>;
  provinces: Observable<Province[]>;
  private $municipaliteChange: BehaviorSubject<IMunicipalite[]>;
  private $provinceChange: BehaviorSubject<Province[]>;
  private dataStore: {
    municipalites: IMunicipalite[],
    provinces: Province[]
   };

   constructor(private http: HttpClient) {
    this.MUNICIPALITE_URL = environment.municipaliteUrl;
    this.PROVINCE_URL = environment.provinceUrl;
    this.dataStore = {
      municipalites: [],
      provinces: [],
    };
    this.$municipaliteChange = new BehaviorSubject([]);
    this.$provinceChange = new BehaviorSubject([]);
    this.municipalites = this.$municipaliteChange.asObservable();
    this.provinces = this.$provinceChange.asObservable();
  }

  private refreshMunicipalites() {
    this.$municipaliteChange.next(Object.assign({}, this.dataStore).municipalites);
  }

  public fetchMunicipalites() {
    return this.http.get<IResponse>(this.MUNICIPALITE_URL)
                    .subscribe(( res: IResponse ) =>  {
                      this.dataStore.municipalites = res.result;
                      this.refreshMunicipalites();
                    });
  }

  public getMunicipalites(): IMunicipalite[] {
    return this.dataStore.municipalites;
  }

  getMunicipaliteById(index: number){
    return this.dataStore.municipalites.find( element => element.municipaliteCode ===  Number(index));
  }

  getMunicipalitesByProvinceId(index: number){
    return this.dataStore.municipalites.filter( element => element.municipaliteProvince ===  Number(index));
  }

  private refreshProvinces() {
    this.$provinceChange.next(Object.assign({}, this.dataStore).provinces);
  }

  public fetchProvinces() {
    return this.http.get<IResponse>(this.PROVINCE_URL)
                    .subscribe(( res: IResponse ) =>  {
                      this.dataStore.provinces = res.result;
                      this.refreshProvinces();
                    });
  }

  public getProvinces(): Province[] {
    if (this.dataStore.provinces.length > 0) { return this.dataStore.provinces; }
    else {
        this.fetchProvinces();
        return this.dataStore.provinces;
    }
  }

  getProvinceById(index: number){
    return this.dataStore.provinces.find( element => element.provinceCode === Number(index));
  }

  getProvinceByName(provinceName: string){
    return this.dataStore.provinces.find( element => element.provinceName === provinceName);
  }
}
