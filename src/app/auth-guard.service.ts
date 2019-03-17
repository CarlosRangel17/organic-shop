import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(
      map(user => {
        if (user) { return true; }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      })
    );
  }
}
