import { Component } from '@angular/core';
import { AuthService } from 'src/app/services';
import { SideNavService } from 'src/app/services/side-nav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
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
