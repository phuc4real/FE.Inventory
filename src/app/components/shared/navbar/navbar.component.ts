import { Component } from '@angular/core';
import { AuthService, SideNavService, UserService } from 'src/app/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sideNavService: SideNavService
  ) {}

  openMenu() {
    this.sideNavService.toggle();
  }

  getUserName(): string {
    return this.userService.getName();
  }

  getRole(): string {
    return this.userService.getRole();
  }

  isAuthenticated(): boolean {
    return this.authService.IsLogged();
  }
}
