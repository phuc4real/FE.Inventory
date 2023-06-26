import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { AuthService } from './../../../services/auth/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup;
  registrationError!: string;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.registrationForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(){

  }

  registerUser(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    const payload = {
      email: this.registrationForm.value.email,
      username: this.registrationForm.value.username,
      password: this.registrationForm.value.password,
    };

    this.authService.register(payload).subscribe(
      (response: any) => {
        this.toastr.success('Đăng ký thành công!', 'Success');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        if (error.status === 400 && Array.isArray(error.error) && error.error.length > 0) {
          const errorMessage = error.error[0].value;
          if (errorMessage === 'User already exists!') {
            this.toastr.error(errorMessage, 'Error');
          } else {
            this.registrationError = 'Registration failed. Please try again.';
          }
        } else {
          this.registrationError = 'Registration failed. Please try again.';
        }
      }
    );
  }
}
