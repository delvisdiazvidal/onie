import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';
import { RequestService } from '../shared/services/request.service';
import { IResponse } from './../../shared/models/response.interface';
import { ValidatorsService } from './../../shared/services/validators.service';

@Component({
  selector: 'ui-request-inspection',
  templateUrl: './request-inspection.component.html',
  styleUrls: ['./request-inspection.component.css']
})
export class RequestInspectionComponent implements OnInit, OnDestroy {

  requestItem: any;
  requestIndex: number;
  inspectionForm: FormGroup;
  indexSubscription: Subscription;
  requestSubscription: Subscription;

  constructor(private requestService: RequestService,
              private route: ActivatedRoute,
              private dialog: ConfirmDialogService,
              private validator: ValidatorsService) { }

  ngOnInit() {
    this.indexSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.requestIndex = +params.id;
        }
      );

    this.requestItem = this.requestService.getRequestStoreItem(this.requestIndex);
    if (this.requestItem) {
      this.requestService.getRequestByLicense(this.requestItem)
              .subscribe( (res: IResponse) => {
                if (res.result) {
                  this.requestItem = res.result;
                }
            });
    } else {
      this.requestSubscription = this.requestService.getRequestApiItem(this.requestIndex)
        .subscribe( (response: IResponse) => {
            if (response.result) {
              this.requestService.getRequestByLicense(response.result)
                .subscribe( (res: IResponse) => {
                  if (res.result) {
                    this.requestItem = res.result;
                  }
              });
            }
        });
      }

    this.initForm();
  }

  get errors(){
    return ErrorMesagge;
  }

  get licenseIdentificator(){
    return this.inspectionForm.get('licenseIdentificator');
  }

  get licenseAmount(){
    return this.inspectionForm.get('licenseAmount');
  }

  get obserInspection(){
    return this.inspectionForm.get('obserInspection');
  }

  private initForm(){
    this.inspectionForm = new FormGroup({
      licenseIdentificator: new FormControl('', [Validators.required,
                                                this.validator.alphaNumeric()]),
      licenseAmount: new FormControl('', [Validators.required, this.validator.nonZero()]),
      obserInspection: new FormControl('', [Validators.required,
                                            this.validator.usualPattern()]),
    });
  }

  inValidFormToDenied(){
    if (!this.obserInspection.valid){
        return true;
    }
  }

  inValidFormToAcepted(){
    if (!this.inspectionForm.valid){
        return true;
    }
  }

  private get newStatus() {
    this.inspectionForm.value.licenseIdentificator = this.inspectionForm.value.licenseIdentificator.trim().toUpperCase();
    this.inspectionForm.value.obserInspection = this.inspectionForm.value.obserInspection.trim();
    const newStatus = {
      requestItem: this.requestItem,
      formValue: this.inspectionForm.value
    };
    return newStatus;
  }

  onDenied(){
    this.dialog.confirm(' Está seguro que desea DENEGAR la Solicitud?')
          .then((confirmed) => {
            if (confirmed) {
              this.requestService.deniedRequest(this.newStatus);
              this.inspectionForm.reset();
            } else { return false; }
          })
          .catch(() => false);
  }

  onAcepted(){
    this.dialog.confirm(' Está seguro que desea OTORGAR la Licencia?')
          .then((confirmed) => {
            if (confirmed) {
              this.requestService.aceptedRequest(this.newStatus);
              this.inspectionForm.reset();
            } else { return false; }
          })
          .catch(() => false);
  }

  ngOnDestroy() {
    this.indexSubscription.unsubscribe();
    if (this.requestSubscription) { this.requestSubscription.unsubscribe(); }
  }

}
