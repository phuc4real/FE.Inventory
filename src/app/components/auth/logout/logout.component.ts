import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService, UserService } from 'src/app/services';
import { showError, showMessage } from 'src/app/share/helpers';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.logout().subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.authService.removeIdentity();
        this.userService.removeName();
      },
      (err: any) => {
        showError(err, this.toastr);
      }
    );

    this.router.navigate(['/login']);
  }
}
