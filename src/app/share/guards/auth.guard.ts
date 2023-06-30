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

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let isAuthenticated = await this.authService.getIsAuthenticated();
    // console.log(isAuthenticated);
    // console.log(state.url);

    if (state.url == '/login' || state.url == '/register') {
      if (isAuthenticated) {
        this.router.navigate(['/']);
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
