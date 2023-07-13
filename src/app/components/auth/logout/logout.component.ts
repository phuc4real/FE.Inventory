import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services';
import { showError, showMessage } from 'src/app/share/helpers/toastr-helper';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.logout().subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.authService.removeToken();
        this.router.navigate(['/login']);
      },
      (err: any) => {
        showError(err, this.toastr);
        this.router.navigate(['/error']);
      }
    );
  }
}
