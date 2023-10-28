import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgChartsModule } from 'ng2-charts';
import {
  AddOrderComponent,
  AddOrderDialogComponent,
  AddTicketComponent,
  AddTicketDialogComponent,
  DashboardChartComponent,
  DashboardComponent,
  EditItemComponent,
  ErrorComponent,
  ExportDetailComponent,
  ItemDetailComponent,
  ListComponent,
  ListExportComponent,
  ListItemComponent,
  ListOrderComponent,
  ListTicketComponent,
  LoadingComponent,
  LoginComponent,
  LogoutComponent,
  NavbarComponent,
  NotFoundComponent,
  OrderDetailComponent,
  RegisterComponent,
  SidebarComponent,
  TabGroupComponent,
  TicketDetailComponent,
  TicketSummaryComponent,
} from './components';
import { SideNavService } from './services';
import { LoaderInterceptor, IdentityInterceptor } from './share/helpers';
import { MaterialModule } from './share/material';

import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { UpdateCategoryDialogComponent } from './components/category/update-category-dialog/update-category-dialog.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DelayedInputModule } from './share/modules';

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
    ListCategoryComponent,
    UpdateCategoryDialogComponent,
  ],
  imports: [
    DelayedInputModule,
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
