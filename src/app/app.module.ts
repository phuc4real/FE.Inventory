import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ExportComponent } from './components/export/export.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MaterialModule } from './share/material/material.module';
import { TokenInterceptor } from './share/helpers/token-interceptor.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { ErrorComponent } from './components/error/error.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SideNavService } from './services/side-nav.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { ItemDetailComponent } from './components/item/item-detail/item-detail.component';
import { ListItemComponent } from './components/item/list-item/list-item.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    LoadingComponent,
    ExportComponent,
    OrderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent,
    LogoutComponent,
    ErrorComponent,
    ItemDetailComponent,
    ListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    MatToolbarModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    SideNavService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
