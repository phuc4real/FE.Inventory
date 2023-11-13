import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, UserService } from 'src/app/services';
import { showError } from 'src/app/share/helpers';
import { LoginModel } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
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

    const request: LoginModel = {
      userName: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.authService.login(request).subscribe(
      (response) => {
        this.router.navigate(['/dashboard']);
        this.toastr.success('Login successful!', 'Success');
        this.authService.saveIdentity(response.data);
        this.userService.getUserInfo().subscribe((response) => {
          this.userService.setName(response);
        });
      },
      (err: any) => showError(err, this.toastr)
    );
  }
}
