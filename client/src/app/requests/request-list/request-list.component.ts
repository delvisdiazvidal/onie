import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { IResponse } from 'src/app/shared/models/response.interface';
import { Roles } from 'src/app/shared/models/roles.model';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { IRequest, IRequestSearch, RequestStatus } from '../shared/models/request.model';
import { RequestService } from '../shared/services/request.service';

@Component({
  selector: 'ui-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit, OnDestroy {

  request$: Observable<IRequest[]>;
  searchForm: FormGroup;
  showSearchValue: boolean;
  requestDetails: any;
  requestsList: IRequestSearch[];
  requestSubscription: Subscription;
  userRol: string;

  constructor(private requestService: RequestService,
              private validator: ValidatorsService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.request$ = this.requestService.getRequests();
    this.requestService.fetchRequest();
    this.userRol = this.authService.userRol;
    this.searchForm = new FormGroup({
      searchValue: new FormControl(null, [Validators.required,
                                          this.validator.alphaNumeric(),
                                          Validators.minLength(11),
                                          Validators.maxLength(20)])
    });
    this.restartSearch();
  }

  restartSearch(){
    this.showSearchValue = false;
    this.requestDetails = null;
    this.requestsList = [];
  }

  get searchValue(){
    return this.searchForm.get('searchValue');
  }

  public ifSearch(){
    return this.showSearchValue ? true : false;
  }

  inValidSearch(){
    return !this.searchForm.valid ? true : false;
  }

  onSearch(){
    this.showSearchValue = true;
    this.requestSubscription = this.requestService.getRequestByOrderNumber(this.searchValue.value)
      .subscribe( (response: IResponse) => {
          if (response.result) {
            this.requestService.getRequestByLicense(response.result)
              .subscribe( (res: IResponse) => {
                if (res.result) {
                  this.requestDetails = res.result;
                }
            });
          } else {
            this.requestService.getRequestsByPersonCI(this.searchValue.value)
              .subscribe( (res: IResponse) => {
                if (res.result) {
                  this.requestsList = res.result;
                }
            });
          }
    });
  }

  onItemView(index: any){
    this.router.navigate(['solicitudes/' + index]);
  }

  inValidButton(status: string){
    if ( (RequestStatus.Denegada === status) || (RequestStatus.Aprobada === status) ){
      return true;
    }
  }

  onNewResquest(){
    this.router.navigate(['solicitudes/nueva-solicitud']);
  }

  onViewItem(index: number){
    this.router.navigate(['solicitudes/' + index]);
  }

  onCheckItem(index: number, status: string){
    if (RequestStatus.Verificada === status){
      this.router.navigate(['solicitudes/' + index + '/confirmar']);
    }

    if (RequestStatus.Solicitada === status){
      this.router.navigate(['solicitudes/' + index + '/verificar']);
    }
  }

  get isNotAdmin(): boolean{
    return this.userRol === Roles.ADMIN ? false : true;
  }

  ngOnDestroy() {
    this.restartSearch();
    if (this.requestSubscription) { this.requestSubscription.unsubscribe(); }
  }


}
