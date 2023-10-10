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
    let IsLogged = this.authService.IsLogged();

    if (IsLogged) {
      if (state.url == '/login' || state.url == '/register') {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
