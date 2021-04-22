import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IResponse } from 'src/app/shared/models/response.interface';
import { PenaltyService } from '../shared/penalty.service';

@Component({
  selector: 'ui-infractor-search',
  templateUrl: './infractor-search.component.html',
  styleUrls: ['./infractor-search.component.css']
})
export class InfractorSearchComponent implements OnInit {

  searchForm: FormGroup;
  offenderItem: any;

  constructor(private penaltyService: PenaltyService,
              private router: Router) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchValue: new FormControl(null, [Validators.required,
                                          Validators.pattern('^[0-9]+[0-9]*$'),
                                          Validators.minLength(11),
                                          Validators.maxLength(11)]),
    });
    this.offenderItem = null;
  }

  onNew(){
    this.router.navigate(['infractores/adicionar-infraccion']);
  }

  inValidSearch(){
    return !this.searchForm.valid ? true : false;
  }

  inCleanSearch(){
    if (this.searchForm.untouched && this.searchForm.pristine) {
      return true;
    }
  }

  onSearch(){
    this.penaltyService.getOffenderByCI(this.searchForm.value.searchValue)
                .subscribe( (res: IResponse) => {
                  this.offenderItem = res.result;
                });
  }

}
