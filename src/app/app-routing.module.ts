import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AddOrderComponent,
  AddTicketComponent,
  DashboardComponent,
  EditItemComponent,
  ErrorComponent,
  ExportDetailComponent,
  ItemDetailComponent,
  ListCategoryComponent,
  ListExportComponent,
  ListItemComponent,
  ListOrderComponent,
  ListTicketComponent,
  LoginComponent,
  LogoutComponent,
  NotFoundComponent,
  OrderDetailComponent,
  RegisterComponent,
  TicketDetailComponent,
} from './components';
import { AuthGuard } from './share/guards';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'item',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ListItemComponent },
      { path: 'add', component: EditItemComponent },
      { path: ':id', component: ItemDetailComponent },
      { path: 'edit/:id', component: EditItemComponent },
    ],
  },
  {
    path: 'category',
    canActivate: [AuthGuard],
    children: [{ path: '', component: ListCategoryComponent }],
  },
  {
    path: 'order',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ListOrderComponent },
      { path: 'add', component: AddOrderComponent },
      { path: ':id', component: OrderDetailComponent },
    ],
  },
  {
    path: 'export',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ListExportComponent },
      { path: ':id', component: ExportDetailComponent },
    ],
  },
  {
    path: 'ticket',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ListTicketComponent },
      { path: 'add', component: AddTicketComponent },
      { path: ':id', component: TicketDetailComponent },
    ],
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: NotFoundComponent },
  { path: 'notfound', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
