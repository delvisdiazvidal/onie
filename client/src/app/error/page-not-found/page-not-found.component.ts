import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  errorMessage: string;
  errorSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
   this.errorSubscription = this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data.message;
      }
    );
  }

  ngOnDestroy(){
    this.errorSubscription.unsubscribe();
  }

}
