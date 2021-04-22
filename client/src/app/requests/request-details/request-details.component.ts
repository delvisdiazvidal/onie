import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestService } from '../shared/services/request.service';
import { IResponse } from 'src/app/shared/models/response.interface';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'ui-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit, OnDestroy {

  requestDetails: any;
  requestIndex: number;
  indexSubscription: Subscription;
  requestSubscription: Subscription;

  constructor(private requestService: RequestService,
              private route: ActivatedRoute,
              private router: Router,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.indexSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.requestIndex = +params.id;
      });

    this.requestDetails = this.requestService.getRequestStoreItem(this.requestIndex);
    if (this.requestDetails) {
      this.requestService.getRequestByLicense(this.requestDetails)
        .subscribe( (res: IResponse) => {
            this.requestDetails = res.result;
        });
    } else {
      this.requestSubscription = this.requestService.getRequestApiItem(this.requestIndex)
      .subscribe( (response: IResponse) => {
          if (response.result.body) {
            this.notifyService.showError(response.result.message);
            this.router.navigate(['solicitudes/todas']);
          } else {
            this.requestService.getRequestByLicense(response.result)
              .subscribe( (res: IResponse) => {
                if (res.result) {
                  this.requestDetails = res.result;
                }
            });
          }
      });
    }
  }

  ngOnDestroy() {
    this.indexSubscription.unsubscribe();
    if (this.requestSubscription) { this.requestSubscription.unsubscribe(); }
  }

}
