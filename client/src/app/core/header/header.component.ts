import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  public user: User;
  public isMenuCollapsed = false;

  constructor(private authService: AuthService) {
    this.authService.currentUser
        .subscribe( user => this.user = user);
    this.isMenuCollapsed = true;
  }

  ngOnInit(): void {}

  ngOnChanges(){}

  notLogged(){
    return this.authService.notLoggedIn();
  }

  isLogged(){
    // REVISAR PORQUE CHEQUEA ESTA FUNCION TANTAS VECES
    return this.authService.isLoggedIn();
  }

  get isUserAdmin(){
    return this.authService.isAdmin;
  }

  isUserAdvanced(){
    return this.authService.isAdvanced();
  }

  isUser(){
    return this.authService.isUser();
  }

  onLogOut() {
    this.authService.logout();
  }

}
