import { AuthService } from '../auth.service';
import { Component } from '@angular/core';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.sass']
})
export class BsNavbarComponent {
  appUser: AppUser;

  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout(){
    this.auth.logout();
  }

}
