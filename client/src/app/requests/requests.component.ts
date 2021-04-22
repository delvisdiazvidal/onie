import { Component, OnInit } from '@angular/core';
import { IFishery, IFisheryCraft } from '../shared/models/utilsModel';
import { UtilsService } from './../shared/services/utils.service';
import { RequestService } from './shared/services/request.service';

@Component({
  selector: 'ui-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private utilService: UtilsService) {
    this.utilService.fetchFishery();
    this.utilService.fetchFisheryCraft();
  }

  ngOnInit(): void {
  }

}
