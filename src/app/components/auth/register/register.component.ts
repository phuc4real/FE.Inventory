import { Observer } from 'rxjs';
import { AuthService } from './../../../services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username!: string;
  email!: string;
  password!: string;
  registrationError!: string;

  constructor(private authService: AuthService) {}

  registerUser(): void {
    const payload = {
      "email": "user@example.com",
      "username": "taiho",
      "password": "taiho"
    };

    this.authService.register(payload).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error(error);
        this.registrationError = 'Registration failed. Please try again.';
      }
    );
  }
}
