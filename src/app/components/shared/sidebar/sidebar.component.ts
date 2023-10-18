import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService, SideNavService } from 'src/app/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidenav') public sidenav!: MatSidenav;

  constructor(
    private sideNavService: SideNavService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.sideNavService.sideNavToggleSubject.subscribe(() => {
      //workaround
      try {
        this.sidenav.toggle();
      } catch (ex) {}
    });
  }

  isAuthenticated(): boolean {
    return this.authService.IsLogged();
  }
}
