import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPenalty } from '../shared/infractor.model';
import { ActivatedRoute, Params } from '@angular/router';
import { PenaltyService } from '../shared/penalty.service';
import { IResponse } from './../../shared/models/response.interface';

@Component({
  selector: 'ui-infractor-details',
  templateUrl: './infractor-details.component.html',
  styleUrls: ['./infractor-details.component.css']
})
export class InfractorDetailsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  penaltyItem: any;
  penaltyIndex: string;

  constructor(  private penaltyService: PenaltyService,
                private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.subscription = this.route.params
        .subscribe( (params: Params) => {
            this.penaltyIndex = params.id;
            this.penaltyItem = this.penaltyService.getOffenderByCI(this.penaltyIndex)
                .subscribe( (res: IResponse) => {
                  this.penaltyItem = res.result;
                });
        });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
