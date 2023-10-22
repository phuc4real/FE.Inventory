import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { showError, showMessage } from 'src/app/share/helpers';
import { AuthService } from 'src/app/services';
import { RegisterModel } from 'src/app/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup;
  registrationError!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registrationForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  registerUser(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    const request: RegisterModel = {
      email: this.registrationForm.value.email,
      userName: this.registrationForm.value.username,
      password: this.registrationForm.value.password,
    };

    this.authService.register(request).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.router.navigate(['/login']);
      },
      (err: any) => showError(err, this.toastr)
    );
  }
}
