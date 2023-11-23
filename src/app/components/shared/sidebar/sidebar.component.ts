import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Operation, Permission } from 'src/app/models';
import { AuthService, SideNavService } from 'src/app/services';
import { getOperation } from 'src/app/share/helpers';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @ViewChild('sidenav') public sidenav!: MatSidenav;
  operation!: Operation;
  constructor(
    private sideNavService: SideNavService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.sideNavService.sideNavToggleSubject.subscribe(() => {
      //workaround
      this.operation = getOperation();
      try {
        this.sidenav.toggle();
      } catch (ex) {}
    });
  }

  isAuthenticated(): boolean {
    return this.authService.IsLogged();
  }
}
