import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { License } from '../shared/models/license.model';
import { LicenseService } from '../shared/license.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ui-license-list',
  templateUrl: './license-list.component.html',
  styleUrls: ['./license-list.component.css']
})
export class LicenseListComponent implements OnInit {

  license$: Observable<License[]>;

  constructor(private licenseService: LicenseService,
              private router: Router) { }

  ngOnInit(): void {
      this.license$ = this.licenseService.getLicenses();
      this.licenseService.fetchLicense();
  }

  onShowLicense(index: number){
    this.router.navigate(['licencias/' + index]);
  }


}
