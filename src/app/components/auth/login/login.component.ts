import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      (response) => {
        this.router.navigate(['/dashboard']);
        this.toastr.success('Login successful!', 'Success');
        this.authService.saveToken(response);
        // // TODO
      },
      (error: any) => {
        if (
          error.status === 400 &&
          Array.isArray(error.error) &&
          error.error.length > 0
        ) {
          const errorMessage = error.error[0].value;
          this.toastr.error(errorMessage, 'Login failed');
        } else {
          this.toastr.error(
            'Something went wrong. Please try again.',
            'Login failed'
          );
        }
      }
    );
  }
}
