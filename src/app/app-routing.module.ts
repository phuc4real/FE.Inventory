import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './share/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/auth/register/register.component';

const routes: Routes = [{ path: '', component: AuthComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
