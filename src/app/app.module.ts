import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MaterialModule } from './share/material/material.module';
import { IdentityInterceptor } from './share/helpers/identity.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { ErrorComponent } from './components/error/error.component';
import { SideNavService } from './services/side-nav.service';
import { ItemDetailComponent } from './components/item/item-detail/item-detail.component';
import { ListItemComponent } from './components/item/list-item/list-item.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EditItemComponent } from './components/item/edit-item/edit-item.component';
import { ListCatalogComponent } from './components/catalog/list-catalog/list-catalog.component';
import { ListOrderComponent } from './components/order/list-order/list-order.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { AddOrderComponent } from './components/order/add-order/add-order.component';
import { AddOrderDialogComponent } from './components/order/add-order-dialog/add-order-dialog.component';
import { ListExportComponent } from './components/export/list-export/list-export.component';
import { ExportDetailComponent } from './components/export/export-detail/export-detail.component';
import { LoaderInterceptor } from './share/helpers/loader.interceptor';
import { NgChartsModule } from 'ng2-charts';
import { DashboardChartComponent } from './components/dashboard/dashboard-chart/dashboard-chart.component';
import { TicketSummaryComponent } from './components/dashboard/ticket-summary/ticket-summary.component';
import { TabGroupComponent } from './components/dashboard/tab-group/tab-group.component';
import { ListComponent } from './components/dashboard/list/list.component';
import { ListTicketComponent } from './components/ticket/list-ticket/list-ticket.component';
import { TicketDetailComponent } from './components/ticket/ticket-detail/ticket-detail.component';
import { AddTicketComponent } from './components/ticket/add-ticket/add-ticket.component';
import { AddTicketDialogComponent } from './components/ticket/add-ticket-dialog/add-ticket-dialog.component';
import { InUseTableComponent } from './components/dashboard/in-use-table/in-use-table.component';
import { UpdateCatalogDialogComponent } from './components/catalog/update-catalog-dialog/update-catalog-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent,
    LogoutComponent,
    ErrorComponent,
    ListItemComponent,
    ItemDetailComponent,
    EditItemComponent,
    ListCatalogComponent,
    ListOrderComponent,
    OrderDetailComponent,
    AddOrderComponent,
    AddOrderDialogComponent,
    ListExportComponent,
    ExportDetailComponent,
    DashboardChartComponent,
    TicketSummaryComponent,
    TabGroupComponent,
    ListComponent,
    ListTicketComponent,
    TicketDetailComponent,
    AddTicketComponent,
    AddTicketDialogComponent,
    InUseTableComponent,
    UpdateCatalogDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgChartsModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IdentityInterceptor,
      multi: true,
    },
    SideNavService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
