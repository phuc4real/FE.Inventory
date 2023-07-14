import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { showError, showMessage } from 'src/app/share/helpers';
import { AuthService } from 'src/app/services';

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

    const payload = {
      email: this.registrationForm.value.email,
      username: this.registrationForm.value.username,
      password: this.registrationForm.value.password,
    };

    this.authService.register(payload).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.router.navigate(['/login']);
      },
      (err: any) => showError(err, this.toastr)
    );
  }
}
