import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'ui-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  user$: Observable<IUser[]>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUsers();
    this.userService.fetchUsers();
  }

  onItemDetails(index: number){
    this.userService.$userEditing.next(index);
  }

}
