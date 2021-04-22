import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'ui-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  public user: User;

  constructor(private authService: AuthService) {
    this.authService.currentUser
        .subscribe( user => this.user = user);
  }

  ngOnInit(): void {
  }

}
