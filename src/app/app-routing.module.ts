import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './share/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { ErrorComponent } from './components/error/error.component';
import { ListItemComponent } from './components/item/list-item/list-item.component';
import { ItemDetailComponent } from './components/item/item-detail/item-detail.component';
import { EditItemComponent } from './components/item/edit-item/edit-item.component';
import { ListCatalogComponent } from './components/catalog/list-catalog/list-catalog.component';
import { ListOrderComponent } from './components/order/list-order/list-order.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { AddOrderComponent } from './components/order/add-order/add-order.component';
import { ListExportComponent } from './components/export/list-export/list-export.component';
import { ExportDetailComponent } from './components/export/export-detail/export-detail.component';
import { ListTicketComponent } from './components/ticket/list-ticket/list-ticket.component';
import { AddTicketComponent } from './components/ticket/add-ticket/add-ticket.component';
import { TicketDetailComponent } from './components/ticket/ticket-detail/ticket-detail.component';

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
    path: 'catalog',
    canActivate: [AuthGuard],
    children: [{ path: '', component: ListCatalogComponent }],
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
