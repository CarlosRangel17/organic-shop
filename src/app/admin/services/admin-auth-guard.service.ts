import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUser } from '../../shared/models/app-user';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .pipe(map((appUser: AppUser) => appUser.isAdmin));
  }
}
