import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from 'src/app/services';
import { getOperation, setOperation } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class OperationGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canAccess: boolean = true;
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    await setOperation(this.userService);
    let operation = getOperation();
    let component = state.url.replace('/', '');

    if (component == 'dashboard') this.canAccess = operation.dashboard.canView;
    if (component == 'item') this.canAccess = operation.item.canView;
    if (component == 'category') this.canAccess = operation.category.canView;
    if (component == 'export') this.canAccess = operation.export.canView;
    if (component == 'order') this.canAccess = operation.order.canView;
    if (component == 'ticket') this.canAccess = operation.ticket.canView;
    if (component == 'item-holder')
      this.canAccess = operation.itemHolder.canView;

    if (this.canAccess) {
      return this.canAccess;
    } else {
      this.router.navigate(['/404']);
      return this.canAccess;
    }
  }
}
