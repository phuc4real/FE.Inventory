import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, SideNavService, UserService } from 'src/app/services';
import { getOperation, setOperation, showError } from 'src/app/share/helpers';
import { LoginModel } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  islogin: boolean = false;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sideNavService: SideNavService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngAfterViewInit() {
    this.islogin = this.authService.IsLogged();
    if (this.islogin) this.router.navigate(['/item']);
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
      async (response) => {
        this.toastr.success('Login successful!', 'Success');
        this.authService.saveIdentity(response.data);
        this.userService.getUserInfo().subscribe((response) => {
          this.userService.setName(response);
          setOperation(this.userService).then(() => {
            this.router.navigate(['/item']);
            this.sideNavService.toggle();
            setTimeout(() => {
              this.sideNavService.toggle();
            }, 100);
          });
        });
      },
      (err: any) => showError(err, this.toastr)
    );
  }
}
