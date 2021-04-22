import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPenalty } from './../shared/infractor.model';
import { Router } from '@angular/router';
import { PenaltyService } from '../shared/penalty.service';

@Component({
  selector: 'ui-infractor-list',
  templateUrl: './infractor-list.component.html',
  styleUrls: ['./infractor-list.component.css']
})
export class InfractorListComponent implements OnInit {

  penalty$: Observable<IPenalty[]>;

  constructor(private penaltyService: PenaltyService,
              private router: Router) { }

  ngOnInit(): void {
      this.penalty$ = this.penaltyService.getPenaltys();
      this.penaltyService.fetchPenalty();
  }

  onShow(index: number){
    this.router.navigate(['infractores/' + index]);
  }

  onNew(){
    this.router.navigate(['infractores/adicionar-infraccion']);
  }

}
