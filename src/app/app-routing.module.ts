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
import { AuthGuard, OperationGuard } from './share/guards';
import { ItemHolderComponent } from './components/item-holder/item-holder.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, OperationGuard],
  },
  {
    path: 'item',
    canActivate: [AuthGuard, OperationGuard],
    children: [
      { path: '', component: ListItemComponent },
      { path: 'add', component: EditItemComponent },
      { path: ':id', component: ItemDetailComponent },
      { path: 'edit/:id', component: EditItemComponent },
    ],
  },
  {
    path: 'item-holder',
    component: ItemHolderComponent,
    canActivate: [AuthGuard, OperationGuard],
  },
  {
    path: 'category',
    canActivate: [AuthGuard, OperationGuard],
    children: [{ path: '', component: ListCategoryComponent }],
  },
  {
    path: 'order',
    canActivate: [AuthGuard, OperationGuard],
    children: [
      { path: '', component: ListOrderComponent },
      { path: 'add', component: AddOrderComponent },
      { path: 'entry/:id', component: OrderDetailComponent },
      { path: 'entry/:id/edit', component: AddOrderComponent },
    ],
  },
  {
    path: 'export',
    canActivate: [AuthGuard, OperationGuard],
    children: [
      { path: '', component: ListExportComponent },
      { path: ':id', component: ExportDetailComponent },
    ],
  },
  {
    path: 'ticket',
    canActivate: [AuthGuard, OperationGuard],
    children: [
      { path: '', component: ListTicketComponent },
      { path: 'add', component: AddTicketComponent },
      { path: 'add', component: AddTicketComponent },
      { path: 'entry/:id', component: TicketDetailComponent },
      { path: 'entry/:id/edit', component: AddTicketComponent },
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
