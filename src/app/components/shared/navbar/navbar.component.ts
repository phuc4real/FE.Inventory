import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService, SideNavService, UserService } from 'src/app/services';
import { showError } from 'src/app/share/helpers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  userName = '';
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sideNavService: SideNavService,
    private toastr: ToastrService
  ) {}

  openMenu() {
    this.sideNavService.toggle();
  }

  getUserName() {
    return this.userService.getUserName();
  }

  isAuthenticated(): boolean {
    return this.authService.IsLogged();
  }
}
