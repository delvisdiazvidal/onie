import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../shared/user.service';
import { IUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'ui-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  userItem: IUser;
  modifyAt: Date;

  constructor(  private userService: UserService,
                private route: ActivatedRoute,
                private router: Router ) { }

  ngOnInit(): void {
    this.subscription = this.route.params
        .subscribe( (params: Params) => {
            const index = +params.id;
            this.userItem = this.userService.getUsersItem(index);
            const modifyAt = new Date(this.userItem.modifyAt);
        });

  }

  onEditUser(){
    this.router.navigate(['editar'], {relativeTo: this.route});
  }

  onEditPass(){
    this.router.navigate(['restablecer-contraseña'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
