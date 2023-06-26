import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ExportComponent } from './components/export/export.component';
import { ItemComponent } from './components/item/item.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CatalogComponent,
    LoadingComponent,
    ExportComponent,
    ItemComponent,
    OrderComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
