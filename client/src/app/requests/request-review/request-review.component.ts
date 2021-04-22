import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { RequestService } from '../shared/services/request.service';
import { IResponse } from './../../shared/models/response.interface';

@Component({
  selector: 'ui-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit, OnDestroy {

  requestReview: any;
  requestIndex: number;
  reviewForm: FormGroup;
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
        });

    this.requestReview = this.requestService.getRequestStoreItem(this.requestIndex);
    if (this.requestReview) {
      this.requestService.getRequestByLicense(this.requestReview)
              .subscribe( (res: IResponse) => {
                if (res.result) {
                  this.requestReview = res.result;
                }
            });
    } else {
      this.requestSubscription = this.requestService.getRequestApiItem(this.requestIndex)
      .subscribe( (response: IResponse) => {
        if (response.result) {
          this.requestService.getRequestByLicense(response.result)
            .subscribe( (res: IResponse) => {
              if (res.result) {
                this.requestReview = res.result;
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

  private initForm(){
    this.reviewForm = new FormGroup({
      obserInspection: new FormControl('', [Validators.required,
                                            this.validator.usualPattern()]),
    });
  }

  get obserInspection(){
    return this.reviewForm.get('obserInspection');
  }



  private get formValue(): any {
    this.reviewForm.value.obserInspection = this.reviewForm.value.obserInspection.trim();
    const formValue: any = {
      requestIndex: this.requestIndex,
      formValue: this.reviewForm.value
    };
    return formValue;
  }

  inValidReviewForm(){
    if (!this.reviewForm.valid){
        return true;
    }
  }

  onDenied(){
    this.dialog.confirm(' Está seguro que desea DENEGAR la Solicitud?')
      .then((confirmed) => {
        if (confirmed) {
          this.requestService.deniedRequest(this.formValue);
          this.reviewForm.reset();
        } else { return false; }
      })
      .catch(() => false);
  }

  onAproved(){
    this.dialog.confirm(' Está seguro que desea ACEPTAR la Solicitud?')
      .then((confirmed) => {
        if (confirmed) {
          this.requestService.aprovedRequest(this.formValue);
          this.reviewForm.reset();
        } else { return false; }
      })
      .catch(() => false);
  }

  ngOnDestroy() {
    this.indexSubscription.unsubscribe();
    if (this.requestSubscription) { this.requestSubscription.unsubscribe(); }
  }

}
