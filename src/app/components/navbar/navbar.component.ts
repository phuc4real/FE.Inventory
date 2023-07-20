import { Component } from '@angular/core';
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
    private sideNavService: SideNavService
  ) {}

  openMenu() {
    this.sideNavService.toggle();
  }

  isAuthenticated(): boolean {
    return this.authService.getIsLogged();
  }
}
