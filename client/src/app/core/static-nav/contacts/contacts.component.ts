import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOurEntity } from './../../../shared/models/utilsModel';
import { UtilsService } from './../../../shared/services/utils.service';

@Component({
  selector: 'ui-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacs$: Observable<IOurEntity[]>;

  constructor(private ourEntityService: UtilsService) { }

  ngOnInit(): void {
    this.contacs$ = this.ourEntityService.getOurEntity();
    this.ourEntityService.fetchOurEntity();
  }

}
