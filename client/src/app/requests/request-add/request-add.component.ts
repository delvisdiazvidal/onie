import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestService } from '../shared/services/request.service';
import { Subscription } from 'rxjs';
import { IResponse } from './../../shared/models/response.interface';
import { IRequestSearch } from '../shared/models/request.model';
import { environment } from 'src/environments/environment';
import { DocsDir } from 'src/app/shared/models/docs.enum';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'ui-request-add',
  templateUrl: './request-add.component.html',
  styleUrls: ['./request-add.component.css']
})
export class RequestAddComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  showSearchValue: boolean;
  requestDetails: any;
  requestsList: IRequestSearch[];
  requestSubscription: Subscription;

  docUrl: string;

  constructor(private router: Router,
              private validator: ValidatorsService,
              private requestService: RequestService) {
                this.docUrl = environment.docsUrl + DocsDir.oficialRoot;
              }

  ngOnInit(): void {
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

  getAPDoc(){
    return this.docUrl + DocsDir.apDoc;
  }

  getASDoc(){
    return this.docUrl + DocsDir.asDoc;
  }

  getPPDoc(){
    return this.docUrl + DocsDir.ppDoc;
  }

  getPSDoc(){
    return this.docUrl + DocsDir.psDoc;
  }

  onNewRequestAquacultureState(){
    this.restartSearch();
    this.router.navigate(['solicitudes/solicitud-licencia-acuicola-estatal']);
  }

  onNewRequestAquaculturePrivate(){
    this.restartSearch();
    this.router.navigate(['solicitudes/solicitud-licencia-acuicola-no-estatal']);
  }

  onNewRequestPlatformState(){
    this.restartSearch();
    this.router.navigate(['solicitudes/solicitud-licencia-plataforma-estatal']);
  }

  onNewRequestPlatformPrivate(){
    this.restartSearch();
    this.router.navigate(['solicitudes/solicitud-licencia-plataforma-no-estatal']);
  }

  ngOnDestroy() {
    this.restartSearch();
    if (this.requestSubscription) { this.requestSubscription.unsubscribe(); }
  }

}
