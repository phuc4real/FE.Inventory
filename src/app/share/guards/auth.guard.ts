import { AuthService } from './../../services';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isAuthenticated = this.authService.getIsAuthenticated();
    // console.log(state.url);

    if (state.url == '/login' || state.url == '/register') {
      if (isAuthenticated) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
    } else {
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
}
