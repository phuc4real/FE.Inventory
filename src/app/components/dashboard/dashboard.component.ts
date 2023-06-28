import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  logout(): void {
    this.authService.logout().subscribe(
      (response) => {
        this.toastr.success('User log out!', 'Success');
        this.authService.removeToken();
        this.router.navigate(['/login']);
      },
      (error: any) => {
        if (
          error.status === 400 &&
          Array.isArray(error.error) &&
          error.error.length > 0
        ) {
          const errorMessage = error.error[0].value;
          this.toastr.error(errorMessage, 'Logout failed');
        } else {
          this.toastr.error(
            'Something went wrong. Please try again.',
            'Logout failed'
          );
        }
      }
    );
  }
}
