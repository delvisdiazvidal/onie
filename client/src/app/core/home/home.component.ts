import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'ui-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService) {
    this.user = this.authService.userValue;
  }

  ngOnInit(): void {}

  getImage(ofertImagePath: string){
    return ofertImagePath == null ? 'assets/img/no-image.jpg' : ofertImagePath;
  }

}
